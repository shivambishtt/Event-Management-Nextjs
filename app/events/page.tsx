import EventCard from "@/components/EventCard";

type Event = {
  _id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  slug: string;
  time: string;
};
async function EventPage() {
  const request = await fetch(`http://localhost:3000/api/events`);
  const { events }: { events: Event[] } = await request.json();

  return (
    <div>
      {events?.map((event: Event) => {
        return (
          <div key={event._id}>
            <EventCard
              title={event?.title}
              description={event.description}
              image={event?.image}
              location={event?.location}
              slug={event?.slug}
              time={event?.time}
            />
          </div>
        );
      })}
    </div>
  );
}

export default EventPage;
