import { notFound } from "next/navigation";
import { IEvent } from "@/models/EventModel";
import Image from "next/image";
import EventDetailItem from "@/components/EventDetailItems";
import EventAgenda from "@/components/EventAgenda";
import EventTags from "@/components/EventTags";
import BookEvent from "@/components/BookEvent";
import { getSimilarEvents } from "@/actions/EventAction";
import EventCard from "@/components/EventCard";

interface EventResponse {
  event: IEvent;
}

async function EventDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const request = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/events/${slug}`,
  );

  const {
    event: {
      title,
      description,
      location,
      date,
      mode,
      time,
      agenda,
      tags,
      audience,
      image,
      organizer,
      overview,
    },
  }: EventResponse = await request.json();

  if (!description) {
    return notFound();
  }

  const bookings = 10;

  const similarEvents: IEvent[] = await getSimilarEvents(slug);
  return (
    <section>
      <div className="w-full max-w-3xl">
        <h1>
          {title} <br />
        </h1>
        <p className="mt-4">{description}</p>
      </div>

      <div className="event-details flex justify-between">
        <div className="event-details-left w-full max-w-3xl">
          <Image
            className="mt-2"
            src={image}
            height={700}
            width={700}
            alt="eventImage"
          />

          <section className="mt-4">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="mt-2 ">
            <div className="space-y-1.5">
              <h2 className="text-2xl font-semibold">Event Details</h2>
              <EventDetailItem
                icon="/icons/calendar.svg"
                alt="calendar"
                label={date}
              />
              <EventDetailItem
                icon="/icons/clock.svg"
                alt="clock"
                label={time}
              />
              {/* location */}
              <EventDetailItem
                icon="/icons/pin.svg"
                alt="location"
                label={location}
              />
              {/* mode */}
              <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />

              {/* audience */}
              <EventDetailItem
                icon="/icons/audience.svg"
                alt="audience"
                label={audience}
              />
            </div>
          </section>

          <EventAgenda agendas={agenda} />

          {/* organizer */}
          <section className="mt-2">
            <h2 className="text-2xl font-semibold">About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>

        <aside className="booking-form">
          <div className="space-y-3 signup-card p-4 bg-[#0c2e249e]">
            <h2 className="font-semibold text-2xl">Book your spot </h2>
            {bookings > 0 ? (
              <p>Join {bookings} people who have already booked their spot</p>
            ) : (
              <p className="text-sm">Be the first to book your spot </p>
            )}
            <BookEvent />
          </div>
        </aside>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Similar Events</h2>
        <div>
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent: IEvent) => {
              return (
                <EventCard
                  title={similarEvent.title}
                  description={similarEvent.description}
                  image={similarEvent.image}
                  location={similarEvent.location}
                  slug={similarEvent.slug}
                  time={similarEvent.time}
                  key={similarEvent._id.toString()}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default EventDetails;
