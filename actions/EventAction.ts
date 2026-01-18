"use server";

import connectDB from "@/lib/database";
import Event from "@/models/EventModel";

export async function getSimilarEvents(slug: string) {
  try {
    await connectDB();
    const event = await Event.findOne({ slug });
    if (!event) return [];

    const similarEvents = await Event.find({
      _id: {
        $ne: event?._id,
      },
      tags: {
        $in: event?.tags,
      },
    });
    return similarEvents;
  } catch {
    return [];
  }
}
