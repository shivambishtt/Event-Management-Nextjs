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

    const bookingExists = await Booking.findOne({ eventId, email });
    if (bookingExists) {
      return NextResponse.json(
        { message: "You have already booked this event" },
        { status: 409 },
      );
    }

    const updatedEvent = await Event.findOneAndUpdate(
      {
        _id: eventId,
        isExpired: false,
        $expr: { $lt: ["$bookedSeats", "$maxSeats"] },
      },
      {
        $inc: { bookedSeats: 1 },
      },
      { new: true },
    );

    if (!updatedEvent) {
      return NextResponse.json(
        { message: "Seats are sold out or event expired" },
        { status: 400 },
      );
    }

    try {
      const booking = await Booking.create({
        eventId,
        email,
      });

      return NextResponse.json(
        { message: "Booking created successfully", booking, success: true },
        {
          status: 200,
        },
      );
    } catch (error) {
      console.error("Booking creation failed:", error);
      await Event.findByIdAndUpdate(eventId, { $inc: { bookedSeats: -1 } });
      return NextResponse.json(
        { message: "Booking failed. Try again." },
        { status: 500 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error occurred while booking the event" },
      { status: 500 },
    );
  }
}
