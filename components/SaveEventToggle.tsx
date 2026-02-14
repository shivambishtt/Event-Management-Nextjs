"use client";

import { BookmarkIcon } from "lucide-react";
import { Toggle } from "./ui/toggle";
import React, { useState } from "react";
import { toast } from "sonner";

interface paramValues {
  slug: string;
  isEventSaved: boolean;
  isExpired: boolean;
}

function SaveEventToggle({ slug, isEventSaved, isExpired }: paramValues) {
  const [isSaved, setIsSaved] = useState<boolean>(isEventSaved);

  const handleSaveEvent = async () => {
    setIsSaved((prev) => !prev);
    try {
      const request = await fetch(`/api/events/${slug}/save`, {
        method: "POST",
      });

      if (isSaved === false) {
        toast.success("Event saved successfully");
      } else if (isSaved === true) {
        toast.success("Event unsaved");
      }
    } catch (error: any) {
      setIsSaved((prev) => !prev);
      toast.error(error.message);
    }
  };
  return (
    <>
      {isSaved ? (
        <Toggle className="hover:cursor-pointer" onClick={handleSaveEvent}>
          <BookmarkIcon className={isSaved ? "fill-current" : ""} />
          Saved
        </Toggle>
      ) : (
        <Toggle className="hover:cursor-pointer" onClick={handleSaveEvent}>
          <BookmarkIcon className={isSaved ? "fill-current" : ""} />
          Save Event
        </Toggle>
      )}
    </>
  );
}

export default SaveEventToggle;
