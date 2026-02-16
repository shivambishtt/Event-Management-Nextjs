import Event from "@/models/EventModel";
import connectDB from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    await connectDB();

    const event = await Event.findOne({ slug: params.slug });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    if (event.latitude != null && event.longitude != null) {
      return NextResponse.json(
        {
          message: "Coordinates sent successfully",
          latitude: event.latitude,
          longitude: event.longitude,
        },
        { status: 200 },
      );
    }

    // geocoding
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        event.location,
      )}`,
      {
        headers: {
          "User-Agent": "eventmanagement",
        },
      },
    );

    const data = await res.json();

    if (data.length === 0 || !data) {
      return Response.json(
        { error: "Could not detect coordinates" },
        { status: 404 },
      );
    }

    const latitude = parseFloat(data[0].lat);
    const longitude = parseFloat(data[0].lon);

    event.latitude = latitude;
    event.longitude = longitude;

    await event.save();
    return NextResponse.json({ latitude, longitude });
  } catch (error) {
    return NextResponse.json(
      { message: "An unknown error occured" },
      { status: 500 },
    );
  }
}
