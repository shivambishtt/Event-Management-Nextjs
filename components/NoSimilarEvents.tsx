import Link from "next/link";

function NoSimilarEvents() {
  return (
    <div className="mt-8 text-center text-gray-400">
      <p className="text-lg font-medium mb-2">No similar events found</p>

      <p className="text-sm mb-4">Explore other events happening around you.</p>

      <Link href="/events" className="text-emerald-400 hover:underline text-sm">
        Browse All Events →
      </Link>
    </div>
  );
}

export default NoSimilarEvents;
