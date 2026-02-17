"use client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type FormValues = {
  email: string;
};

interface BookEventProps {
  eventId: string;
  maxSeats: number;
  bookedSeats: number;
}

function BookEvent({ eventId, maxSeats, bookedSeats }: BookEventProps) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    setChecking(true);
    if (session?.user.email) {
      setChecking(false);
      return;
    }

    const checkBooking = async () => {
      try {
        const request = await fetch(`/api/bookings/check?eventId=${eventId}`);
        const data = await request.json();

        if (data.booked) {
          setSubmitted(true);
        }
      } catch (error) {
        console.error("Failed to check booking status");
      } finally {
        setChecking(false);
      }
    };
    checkBooking();
  }, [session?.user.email, eventId]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setMessage(null);
    const booking = await fetch(`/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
        email: data.email,
      }),
    });
    const result = await booking.json();

    if (booking.status === 409) {
      setSubmitted(true);
      setMessage("You have already booked this event.");
      return;
    }

    if (!booking.ok) {
      setMessage("Booking failed. Please try again later");
      toast.error(result.message);
      return;
    }
    router.refresh();
    toast.success(result.message);

    await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
        email: data.email,
      }),
    });
    setSubmitted(true);
    setMessage("Booking successful! Confirmation email sent.");
  };
  if (checking) {
    return <h1>Checking ⌛. Please Wait</h1>;
  }

  return (
    <>
      {submitted ? (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-3">
            🎉 Registration Successful!
          </h2>

          <p className="text-gray-700 mb-2">
            Thank you for signing up for the Robotics Workshop.
          </p>

          <p className="text-gray-600 text-sm">
            A confirmation email has been sent with all the event details.
          </p>

          <button className="mt-5 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition">
            View Event Details
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">Email</label> <br />
            <Input
              className="bg-transparent w-full p-1.5 text-white"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <Button
            className="bg-emerald-700 text-white hover:cursor-pointer px-7 py-1.5 w-full rounded mt-2"
            type="submit"
          >
            Submit
          </Button>
        </form>
      )}
    </>
  );
}

export default BookEvent;
