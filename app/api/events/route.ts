import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Event, { generateSlug } from "@/models/EventModel";
import { uploadImageToCloudinary } from "@/lib/imageupload";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const token = await getToken({ req });

    if (!token || token.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized request" },
        { status: 401 },
      );
    }
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const {
      title,
      description,
      overview,
      venue,
      date,
      time,
      mode,
      maxSeats,
      agenda,
      tags,
      audience,
      organizer,
    } = data;

    // convert types for formData
    const parsedDate = new Date(date);
    const parsedMaxSeats = Number(maxSeats);
    const parsedAgenda = JSON.parse(agenda);
    const parsedTags = JSON.parse(tags);

    if (!parsedMaxSeats || isNaN(parsedMaxSeats) || parsedMaxSeats <= 0) {
      return NextResponse.json(
        { message: "Invalid seat count" },
        { status: 400 },
      );
    }

    // cloudinary image logic
    const image = formData.get("image") as File;
    const imageUrl = await uploadImageToCloudinary(image, "eventmanagement");

    const event = await Event.create({
      title,
      description,
      overview,
      venue,
      image: imageUrl,
      date: parsedDate,
      time,
      mode,
      maxSeats: parsedMaxSeats,
      bookedSeats: 0,
      agenda: parsedAgenda,
      tags: parsedTags,
      audience,
      organizer,
      slug: generateSlug(title),
    });

    return NextResponse.json(
      {
        message: "Event created successfully",
        event,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Event creation error:", error);

    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 }).limit(3).lean();

    return NextResponse.json(
      {
        message: "Events fetched successfully",
        events,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching events",
        error,
      },
      { status: 500 },
    );
  }
}
