import { notFound } from "next/navigation";
import { IEvent } from "@/models/EventModel";
import Image from "next/image";
import EventDetailItem from "@/components/EventDetailItems";
import EventAgenda from "@/components/EventAgenda";
import EventTags from "@/components/EventTags";

interface EventResponse {
  event: IEvent;
}

async function EventDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const request = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/events/${slug}`
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
          <Image className="mt-2" src={image} height={700} width={700} alt="eventImage" />

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

          <EventAgenda agendas={JSON.parse(agenda[0])} />

          {/* organizer */}
          <section className="mt-2">
            <h2 className="text-2xl font-semibold">About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags  tags={JSON.parse(tags[0])} />
        </div>

        <div className="event-details-right">
          <aside className="booking-form">
            <p className="font-semibold ">Book Event </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default EventDetails;
