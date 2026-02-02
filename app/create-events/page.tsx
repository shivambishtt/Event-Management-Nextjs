"use client";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Controller, useForm } from "react-hook-form";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { redirect } from "next/navigation";

interface FormValues {
  title: string;
  description: string;
  overview: string;
  venue: string;
  image?: File;
  location: string;
  date: Date;
  time: string;
  mode: string;
  agenda: [];
  tags: [];
  audience: string;
  organizer: string;
}

export default function CreateEvent() {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("overview", data.overview);
    formData.append("venue", data.venue);
    formData.append("location", data.location);
    formData.append("time", data.time);
    formData.append("mode", data.mode);
    formData.append("agenda", JSON.stringify(data.agenda));
    formData.append("tags", JSON.stringify(data.tags));
    formData.append("audience", data.audience);
    formData.append("organizer", data.organizer);

    if (data.image) {
      formData.append("image", data.image as File);
    }

    if (data.date) {
      formData.append("date", data.date.toISOString());
    }

    await fetch("/api/events", {
      method: "POST",
      body: formData,
    });
    setIsSubmitting(false);
    reset();
    redirect("/");
  };

  return (
    <div className="relative">
      <h1 className="text-5xl">Create Event</h1>
      <form className="flex flex-col py-4" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <Controller
          name="title"
          defaultValue=""
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <Input placeholder="Enter event title" {...field} />
          )}
        />

        <label htmlFor="description">Description</label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <Input placeholder="Enter event description here" {...field} />
          )}
        />

        <label htmlFor="overview">Overview</label>
        <Controller
          name="overview"
          control={control}
          rules={{ required: "Overview is required" }}
          render={({ field }) => (
            <Textarea
              placeholder="Enter overview for your event"
              draggable="false"
              {...field}
            />
          )}
        />

        <label htmlFor="image">Image</label>

        <Controller
          name="image"
          control={control}
          rules={{ required: "Image is required" }}
          render={({ field }) => (
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => field.onChange(e.target.files?.[0])}
              ref={field.ref}
            />
          )}
        />

        <label htmlFor="date">Date</label>
        <Controller
          name="date"
          control={control}
          rules={{ required: "Date is required" }}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className=" justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? format(field.value, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          )}
        />

        <label htmlFor="time">Time</label>
        <Controller
          name="time"
          control={control}
          rules={{ required: "Time is required" }}
          render={({ field }) => (
            <Input type="time" placeholder="Time of event" {...field} />
          )}
        />

        <label htmlFor="location">Location</label>
        <Controller
          name="location"
          control={control}
          rules={{ required: "Location is required" }}
          render={({ field }) => (
            <Input placeholder="Location of event" {...field} />
          )}
        />

        <label htmlFor="venue">Venue</label>
        <Controller
          name="venue"
          control={control}
          rules={{ required: "Venue is required" }}
          render={({ field }) => (
            <Input placeholder="Venue of event" {...field} />
          )}
        />

        <label htmlFor="mode">Mode</label>
        <Controller
          name="mode"
          control={control}
          rules={{ required: "Mode is required" }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="bg-black">
                <SelectValue className="text-white" placeholder="Enter mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />

        <label htmlFor="organizer">Organizer</label>
        <Controller
          name="organizer"
          control={control}
          rules={{ required: "Organizer is required" }}
          render={({ field }) => (
            <Input placeholder="Organizer's name" {...field} />
          )}
        />

        <label htmlFor="tags">Tags</label>
        <Controller
          name="tags"
          control={control}
          rules={{ required: "Tags are required" }}
          render={({ field }) => (
            <Input placeholder="E.g- Devops, Fullstack" {...field} />
          )}
        />

        <label htmlFor="agenda">Agenda</label>
        <Controller
          name="agenda"
          control={control}
          rules={{ required: "Agendas are required" }}
          render={({ field }) => <Input {...field} />}
        />

        <label htmlFor="audience">Audience</label>
        <Controller
          name="audience"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="E.g- Students, Developers, Engineers"
              {...field}
            />
          )}
        />
        {isSubmitting ? (
          <Button className="bg-emerald-700 mt-6" disabled type="submit">
            Create Event
          </Button>
        ) : (
          <Button className="bg-emerald-700 mt-6" type="submit">
            Create Event
          </Button>
        )}
      </form>
    </div>
  );
}
