import Link from "next/link";
import { Button } from "../ui/button";

function FindEventButton() {
  return (
    <div className="flex items-center justify-center">
      <Button className="mt-6 bg-emerald-700  p-1 rounded">
        <Link href={`/events`}>Find Events</Link>
      </Button>
    </div>
  );
}

export default FindEventButton;
