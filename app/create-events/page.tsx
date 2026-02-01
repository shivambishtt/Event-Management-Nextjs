"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  title: string;
  description: string;
  overview: string;
  venue: string;
  // image:
  location: string;
  date: string;
  time: string;
  mode: string;
  agenda: [];
  tags: [];
  audience: string;
  organizer: string;
}

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("this");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async () => {
    if (!imageFile) return alert("Image required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("overview", "overview text");
    formData.append("venue", "Delhi");
    formData.append("image", imageFile);
    formData.append("location", "India");
    formData.append("date", "2026-02-10");
    formData.append("time", "10:00 AM");
    formData.append("mode", "Offline");
    formData.append("agenda", JSON.stringify(["Intro", "Talk"]));
    formData.append("tags", JSON.stringify(["tech", "web"]));
    formData.append("audience", "Students");
    formData.append("organizer", "Admin");

    const response = await fetch("/api/events", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div>
      <h1>Create Event</h1>
      <form className="flex flex-col py-4" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <input className="bg-gray-700 " type="" {...register("title")} />

        <label htmlFor="description">Description</label>
        <input
          className="bg-gray-700"
          type="text"
          {...register("description")}
        />

        <label htmlFor="date">Date</label>
        <input className="bg-gray-700" type="date" {...register("date")} />

        <label htmlFor="location">Location</label>
        <input className="bg-gray-700" type="" {...register("location")} />

        <label htmlFor="location">Mode</label>
        <input className="bg-gray-700" type="" {...register("mode")} />

        <label htmlFor="location">Organizer</label>
        <input className="bg-gray-700" type="" {...register("organizer")} />

        <label htmlFor="location">Tags</label>
        <input className="bg-gray-700" type="" {...register("tags")} />
      </form>
      <button type="submit">Submit</button>
    </div>
  );
}
