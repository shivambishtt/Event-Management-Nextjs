import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookmarkX } from "lucide-react";

function NoSavedEvents() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="bg-[#0c2e249e] backdrop-blur-md p-10 rounded-2xl text-center max-w-md w-full shadow-lg border border-white/10">
        <div className="flex justify-center mb-4">
          <BookmarkX size={40} className="text-emerald-400" />
        </div>

        <h2 className="text-2xl font-semibold mb-3">No Saved Events Yet</h2>

        <p className="text-gray-300 mb-6">
          Looks like you haven’t saved any events yet. Explore events and
          bookmark the ones you’re interested in.
        </p>

        <Link href="/events">
          <Button className="w-full hover:cursor-pointer">
            Explore Events
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NoSavedEvents;
