import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database";
import Event from "@/models/EventModel";
import { generateSlug } from "@/models/EventModel";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const event = Object.fromEntries(formData.entries());

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const overview = formData.get("overview") as string;
    const venue = formData.get("venue") as string;
    const image = formData.get("image") as File;
    const location = formData.get("location") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const mode = formData.get("mode") as string;
    const agenda = JSON.parse(formData.get("agenda") as string);
    const tags = JSON.parse(formData.get("tags") as string);
    const audience = formData.get("audience") as string;
    const organizer = formData.get("organizer") as string;

    const MAX_SIZE_IMAGE: number = 5 * 1024 * 1024;

    if (!image) {
      return NextResponse.json(
        { message: "Please upload image first" },
        { status: 400 },
      );
    }

    if (image.size > MAX_SIZE_IMAGE) {
      return NextResponse.json({
        message: "Please upload image less than 5 Mb",
      });
    }

    // image conversion to buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadImage = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "eventmanagement",
          },
          (error, success) => {
            if (error) reject(error);
            resolve(success);
          },
        )
        .end(buffer);
    });

    const url = (uploadImage as { secure_url: string }).secure_url;

    const eventCreated = await Event.create({
      title,
      description,
      overview,
      venue,
      image: url,
      location,
      date,
      time,
      mode,
      agenda,
      tags: tags,
      audience,
      organizer,
      slug: generateSlug(title),
    });

    if (!eventCreated) {
      return NextResponse.json(
        { message: "Error occured while creating the event" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Event successfully created", event: eventCreated },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error creating event:", error);

    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        message: errorMessage,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({
      createdAt: -1,
    });
    if (!events) {
      return NextResponse.json(
        { message: "Oops No events found." },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        message: "Events fetched successfully",
        events,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error occured while fetching the events", error },
      { status: 500 },
    );
  }
}
