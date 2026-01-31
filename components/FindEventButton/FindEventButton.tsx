"use client";

import Link from "next/link";

function FindEventButton() {
  return (
    <div className="flex items-center justify-center">
      <button className="mt-6 bg-gray-600 p-1 rounded">
        <Link href={`/events`}>Find Events</Link>
      </button>
    </div>
  );
}

export default FindEventButton;
