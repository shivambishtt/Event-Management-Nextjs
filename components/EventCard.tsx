import Image from "next/image";
import Link from "next/link";

export interface EventCardProps {
  slug: string;
  title: string;
  description: string;
  time: string;
  location: string;
  image: string;
}

function EventCard({
  slug,
  title,
  description,
  time,
  location,
  image,
}: EventCardProps) {
  return (
    <div className="mt-10">
      <Link href={`/events/${slug}`}>
        {/* Title */}
        <h3 className="text-3xl font-semibold mb-4">{title}</h3>
      </Link>

      {/* Meta Info */}
      <div className="flex gap-6 items-center text-gray-400 mb-6">
        <div className="flex gap-2 items-center">
          <Image
            src="/icons/calendar.svg"
            alt="calendar"
            width={16}
            height={16}
          />
          <span>{time}</span>
        </div>

        <div className="flex gap-2 items-center">
          <Image src="/icons/pin.svg" alt="location" width={16} height={16} />
          <span>{location}</span>
        </div>
      </div>

      {/* Image + Description */}
      <div className="flex gap-8 items-start">
        <Image
          src={image}
          alt={title}
          width={500}
          height={250}
          className="rounded-xl object-cover shrink-0"
        />

        <div>
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="text-gray-300 leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
