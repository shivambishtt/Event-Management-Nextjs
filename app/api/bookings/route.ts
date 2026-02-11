import { NextResponse, NextRequest } from "next/server";
import Booking from "@/models/BookingModel";
import connectDB from "@/lib/connectDB";
import Event from "@/models/EventModel";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { eventId, email } = await req.json();
    if (!eventId || !email) {
      return NextResponse.json(
        { message: "Event ID and email are required" },
        { status: 400 },
      );
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    if (event.isExpired) {
      return NextResponse.json(
        {
          message: "Booking closed as event is expired",
        },
        { status: 400 },
      );
    }

    const booking = await Booking.create({ eventId, email });
    if (!booking) {
      return NextResponse.json(
        {
          message: "An unknown error occured while booking",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: "Booking done successfully",
        booking,
        success: true,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error occured while booking the event",
      },
      { status: 500 },
    );
  }
}
