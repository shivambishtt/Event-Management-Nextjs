import connectDB from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
import Booking from "@/models/BookingModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({
        message: "No session detected try logging in first",
        status: 400,
      });
    }

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized request" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json(
        { message: "No event found with particular event ID" },
        { status: 400 },
      );
    }

    const booking = await Booking.findOne({
      eventId,
      email: session.user.email,
    });

    return NextResponse.json({ booked: !!booking });
  } catch (error) {
    return NextResponse.json(
      { message: "An unknown error occured" },
      { status: 500 },
    );
  }
}
