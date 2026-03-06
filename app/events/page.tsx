import EventCard from "@/components/EventCard";
import connectDB from "@/lib/connectDB";
import Event from "@/models/EventModel";
import { Types } from "mongoose";

export interface IEventPreview {
  _id: Types.ObjectId;
  title: string;
  description: string;
  image: string;
  location: string;
  slug: string;
  time: string;
}
async function EventPage() {
  await connectDB();
  const events = await Event.find()
    .select("title description image location slug time")
    .sort({ createdAt: -1 })
    .limit(3)
    .lean<IEventPreview[]>();

  return (
    <div>
      {events.map((event: IEventPreview) => {
        return (
          <div key={event._id.toString()}>
            <EventCard
              title={event.title}
              description={event.description}
              image={event.image}
              location={event?.location}
              slug={event.slug}
              time={event.time}
            />
          </div>
        );
      })}
    </div>
  );
}

export default EventPage;
