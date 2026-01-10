import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database";
import Event from "@/models/EventModel";
import { generateSlug } from "@/models/EventModel";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const event = Object.fromEntries(formData.entries());

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const overview = formData.get("overview") as string;
    const venue = formData.get("venue") as string;
    const image = formData.get("image") as string;
    const location = formData.get("location") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const mode = formData.get("mode") as string;
    const agenda = formData.getAll("agenda") as string[];
    const tags = formData.getAll("tags") as string[];
    const audience = formData.get("audience") as string;
    const organizer = formData.get("organizer") as string;

    const slugGeneration = generateSlug(title);

    const eventCreated = await Event.create({
      title,
      description,
      overview,
      venue,
      image,
      location,
      date,
      time,
      mode,
      agenda,
      tags,
      audience,
      organizer,
      slug: slugGeneration,
    });

    if (!eventCreated) {
      return NextResponse.json(
        { message: "Error occured while creating the event" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Event successfully created", event: eventCreated },
      { status: 200 }
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
      { status: 500 }
    );
  }
}
