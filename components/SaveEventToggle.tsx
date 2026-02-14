"use client";

import { BookmarkIcon } from "lucide-react";
import { Toggle } from "./ui/toggle";
import React, { useState } from "react";
import { toast } from "sonner";

interface paramValues {
  slug: string;
  isEventSaved: boolean;
}

function SaveEventToggle({ slug, isEventSaved }: paramValues) {
  const [isSaved, setIsSaved] = useState<boolean>(isEventSaved);

  const handleSaveEvent = async () => {
    setIsSaved((prev) => !prev);
    try {
      const request = await fetch(`/api/events/${slug}/save`, {
        method: "POST",
      });
      const response = await request.json();
      toast.success(response.message);
    } catch (error: any) {
      setIsSaved((prev) => !prev);
      toast.error(error.message);
    }
  };
  return (
    <Toggle className="hover:cursor-pointer" onClick={handleSaveEvent}>
      <BookmarkIcon className={isSaved ? "fill-current" : ""} />
      Save Event
    </Toggle>
  );
}

export default SaveEventToggle;
