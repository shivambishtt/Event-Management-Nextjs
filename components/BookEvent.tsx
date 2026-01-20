"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  email: string;
};

function BookEvent() {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = () => {
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
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
              value={email}
              placeholder="Enter your email"
              {...register("email")}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <button
            className="bg-[#66F1C2] text-black px-7 py-1.5 w-full rounded mt-2"
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
