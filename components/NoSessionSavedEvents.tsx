import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "lucide-react";

function NoSessionSavedEvents() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="bg-[#0c2e249e] backdrop-blur-md p-10 rounded-2xl text-center max-w-md w-full shadow-lg border border-white/10">
        <div className="flex justify-center mb-4">
          <BookmarkIcon size={40} className="text-emerald-400" />
        </div>

        <h2 className="text-2xl font-semibold mb-3">Saved Events</h2>

        <p className="text-gray-300 mb-6">
          You need to sign in to view your saved events and manage them.
        </p>

        <Link href="/signin">
          <Button className="w-full hover:cursor-pointer">Sign In</Button>
        </Link>
      </div>
    </div>
  );
}

export default NoSessionSavedEvents;
