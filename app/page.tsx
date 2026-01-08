import FindEventButton from "@/components/FindEventButton/FindEventButton";
import EventCard, { EventCardProps } from "@/components/EventCard";

const events: EventCardProps[] = [
  {
    eventId: 1,
    eventTitle: "React Summit 2026",
    eventDescription:
      "A full-day conference focused on modern React, performance optimization, and real-world patterns.",
    eventDuration: "12 April 2026 • 8:00 AM – 5:00 PM",
    eventLocation: "Bangalore, India",
    eventNiche: "Frontend Development",
    eventImage: "/images/event1.png",
  },
  {
    eventId: 2,
    eventTitle: "AI & ML Bootcamp",
    eventDescription:
      "Hands-on bootcamp covering machine learning fundamentals, model training, and deployment.",
    eventDuration: "3–5 May 2026 • 9:00 AM – 4:00 PM",
    eventLocation: "Hyderabad, India",
    eventNiche: "Artificial Intelligence",
    eventImage: "/images/event2.png",
  },
  {
    eventId: 3,
    eventTitle: "Cloud Native Workshop",
    eventDescription:
      "Learn Docker, Kubernetes, and cloud-native architectures with practical labs.",
    eventDuration: "22 June 2026 • 10:00 AM – 4:00 PM",
    eventLocation: "Pune, India",
    eventNiche: "Cloud Computing",
    eventImage: "/images/event3.png",
  },
  // {
  //   eventId: 4,
  //   eventTitle: "JavaScript Meetup Night",
  //   eventDescription:
  //     "An evening meetup for JavaScript enthusiasts to network and share industry insights.",
  //   eventDuration: "15 July 2026 • 6:00 PM – 9:00 PM",
  //   eventLocation: "Delhi, India",
  //   eventImage: "/images/event4.png",
  // },
  // {
  //   eventId: 5,
  //   eventTitle: "UI/UX Design Sprint",
  //   eventDescription:
  //     "A design-focused sprint covering user research, wireframing, and prototyping techniques.",
  //   eventDuration: "9–10 August 2026 • 9:30 AM – 5:00 PM",
  //   eventLocation: "Mumbai, India",
  //   eventNiche: "UI/UX Design",
  //   eventImage: "/images/event5.png",
  // },
];

function page() {
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
            {events.map((event) => {
              return <EventCard key={event.eventId} {...event} />
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

export default page;
