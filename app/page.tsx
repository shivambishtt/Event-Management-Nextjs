import FindEventButton from "@/components/FindEventButton/FindEventButton";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/models/EventModel";

async function page() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events`);

  const { events } = await response.json();

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
        {/* Events Section */}

        <div className="mt-20">
          <h2 className="text-2xl font-semibold">Featured Events</h2>
          <br />
          <ul>
            {events &&
              events.length > 0 &&
              events.map((event: IEvent) => {
                return <EventCard key={event.slug} {...event} />;
              })}
          </ul>
        </div>
      </section>
    </>
  );
}

export default page;
