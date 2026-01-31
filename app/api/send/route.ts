import connectDB from "@/lib/database";
import BookingEmailValidation from "@/email/BookingEmailValidation";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Event from "@/models/EventModel";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { eventId, email } = await req.json();
    const event = await Event.findById(eventId);
    const formattedEventDate = event?.date.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    if (!formattedEventDate) {
      return NextResponse.json(
        { message: "Event date type mismatched" },
        { status: 404 },
      );
    }

    if (!event || !event.date) {
      return NextResponse.json(
        { message: "Event not found or date missing" },
        { status: 404 },
      );
    }

    const { data } = await resend.emails.send({
      from: "Eve<onboarding@resend.dev>",
      to: [email],
      subject: "Booking confirmation for event",
      react: BookingEmailValidation({
        eventTitle: event.title,
        eventDate: formattedEventDate,
        eventLocation: event.location,
        eventTime: event.time,
        eventMode: event.mode,
      }),
    });

    return NextResponse.json(
      { message: "Email sent successfully.", success: true, data },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error occured while sending the email", error },
      { status: 500 },
    );
  }
}
