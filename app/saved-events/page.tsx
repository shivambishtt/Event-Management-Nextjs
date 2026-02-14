import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/connectDB";
import User from "@/models/UserModel";
import { IEvent } from "@/models/EventModel";
import EventCard from "@/components/EventCard";
import NoSessionSavedEvents from "@/components/NoSessionSavedEvents";
import NoSavedEvents from "@/components/NoSavedEvents";

async function SavedEvents() {
  connectDB();
  const session = await getServerSession(authOptions);
  if (!session) {
    return <NoSessionSavedEvents />;
  }

  const user = await User.findById(session.user.id).populate("savedEvents");

  if (!user) {
    return <NoSessionSavedEvents />;
  } else if (user.savedEvents.length === 0) {
    return <NoSavedEvents />;
  }

  return (
    <div>
      {user.savedEvents.map((event: IEvent) => {
        return (
          <EventCard
            key={event._id.toString()}
            title={event.title}
            description={event.description}
            image={event.image}
            location={event.location}
            slug={event.slug}
            time={event.time}
          />
        );
      })}
    </div>
  );
}

export default SavedEvents;
