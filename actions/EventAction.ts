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

export async function setExpiry(slug: string) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const event = await Event.findOne({ slug });

  if (event?.date && currentDate > event.date && !event.isExpired) {
    await Event.updateOne({ _id: event._id }, { $set: { isExpired: true } });
  }
}
