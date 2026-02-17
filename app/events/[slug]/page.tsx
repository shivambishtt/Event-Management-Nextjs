import { notFound } from "next/navigation";
import { IEvent } from "@/models/EventModel";
import Image from "next/image";
import EventDetailItem from "@/components/EventDetailItems";
import EventAgenda from "@/components/EventAgenda";
import EventTags from "@/components/EventTags";
import BookEvent from "@/components/BookEvent";
import { getSimilarEvents, setExpiry } from "@/actions/EventAction";
import EventCard from "@/components/EventCard";
import SaveEventToggle from "@/components/SaveEventToggle";
import { getServerSession } from "next-auth";
import User from "@/models/UserModel";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NoSimilarEvents from "@/components/NoSimilarEvents";
import EventExpired from "@/components/EventExpired";
import BookingForm from "@/components/BookingForm";
import Booking from "@/models/BookingModel";

interface EventResponse {
  event: IEvent;
}

async function EventDetails({ params }: { params: Promise<{ slug: string }> }) {
  let isEventSaved = false;
  const { slug } = await params;
  const expiredEvent = await setExpiry(slug);
  const bookings = 10;

  const request = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/events/${slug}`,
    { cache: "no-store" },
  );

  if (!request.ok) {
    return notFound();
  }
  const {
    event: {
      _id,
      isExpired,
      title,
      description,
      location,
      latitude,
      longitude,
      maxSeats,
      bookedSeats,
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

  if (session) {
    const user = await User.findById(session.user.id);

    if (user) {
      isEventSaved = user.savedEvents.some(
        (id) => id.toString() === _id.toString(),
      );
    }
  }
  const dateConversion = new Date(date);
  const normalizeDate = dateConversion.toDateString();

  const availableSeats = maxSeats - bookedSeats;

  const similarEvents: IEvent[] = await getSimilarEvents(slug);
  return (
    <section>
      <div className="flex items-center ">
        <div className="max-w-3xl">
          <h1>
            {title} <br />
          </h1>
          <p className="mt-4">{description}</p>
        </div>

        <span className="flex items-center justify-center mx-auto">
          {!isExpired ? (
            <SaveEventToggle
              slug={slug}
              isEventSaved={isEventSaved}
              isExpired={isExpired}
            />
          ) : (
            ""
          )}
        </span>
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
                label={normalizeDate}
              />
              <EventDetailItem
                icon="/icons/clock.svg"
                alt="clock"
                label={time}
              />

              {/* location */}
              <p>
                <EventDetailItem
                  icon="/icons/pin.svg"
                  alt="location"
                  label={location}
                />
              </p>

              {/* mode */}
              <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />

              {/* seats */}
              <EventDetailItem
                icon="/icons/audience.svg"
                alt="mode"
                label={`Max seats ${maxSeats}`}
              />

              {/* seats */}
              <EventDetailItem
                icon="/icons/audience.svg"
                alt="mode"
                label={`Available seats ${availableSeats}`}
              />
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

        <div className="event-details-right h-auto">
          {isExpired === true ? (
            <EventExpired />
          ) : (
            <BookingForm
              bookings={bookings}
              maxSeats={maxSeats}
              bookedSeats={bookedSeats}
              _id={_id}
            />
          )}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Similar Events</h2>
        <div>
          {similarEvents.length > 0 ? (
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
            })
          ) : (
            <NoSimilarEvents />
          )}
        </div>
      </div>
    </section>
  );
}

export default EventDetails;
