import FindEventButton from "@/components/FindEventButton/FindEventButton";
import EventCard from "@/components/EventCard";
import Event from "@/models/EventModel";
import connectDB from "@/lib/connectDB";
import { IEventPreview } from "./events/page";

async function page() {
  await connectDB();
  const events = await Event.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean<IEventPreview[]>();
  return (
    <>
      <section>
        <h1 className="text-center text-5xl">
          Your One stop Solution for
          <br />
          Managing Tech Events
        </h1>
        <p className="text-center mt-4 text-2xl">
          Confereneces | Hackathons | Meetings
        </p>
        <FindEventButton />

        <div className="mt-20">
          <h2 className="font-semibold text-4xl">Featured Events</h2>
          <br />
          <ul>
            {events.map((event) => {
              return <EventCard key={event.slug} {...event} />;
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

export default page;
