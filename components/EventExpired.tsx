import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

function EventExpired() {
  return (
    <div className="flex justify-center ">
      <div className="bg-[#2a1c1c] border border-red-500/30 p-8 rounded-2xl max-w-md w-full text-center shadow-lg">
        <div className="flex justify-center mb-4">
          <AlertTriangle size={36} className="text-red-400" />
        </div>

        <h2 className="text-xl font-semibold text-red-300 mb-3">
          This Event Has Expired
        </h2>

        <p className="text-gray-300 mb-6">
          Bookings are now closed for this event. Explore other upcoming events
          instead.
        </p>

        <Link href="/events">
          <Button variant="secondary" className="w-full hover:cursor-pointer">
            Browse Upcoming Events
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default EventExpired;
