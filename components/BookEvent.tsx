"use client";
import { notFound } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  email: string;
};

interface BookEventProps {
  eventId: string;
}

function BookEvent({ eventId }: BookEventProps) {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const request = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
        email: data.email,
      }),
    });

    if (!request.ok) {
      return notFound();
    }
    setSubmitted(true);
  };

  return (
    <div>
      {submitted ? (
        <p>Thankyou for signing up.</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">Email Address</label> <br />
            <input
              className="bg-teal-700 w-full p-1.5 text-white"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <button
            className="bg-[#66f1ea] text-black px-7 py-1.5 w-full rounded mt-2"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default BookEvent;
