"use client";

import { Button } from "@/components/ui/button";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface SignupInputs {
  name: string;
  email: string;
  password: string;
}

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>();

  const onsubmit: SubmitHandler<SignupInputs> = async (data) => {
    const request = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
  });
    
    await fetch("/api/onboarding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <Card className="w-full max-w-sm mx-auto mt-6 px-10">
          <CardHeader>
            <CardTitle>
              <h2 className="text-3xl  text-center font-semibold w-full">
                Welcome!
              </h2>
            </CardTitle>
            <p className="mx-auto -my-1">
              Already have an account? {""}
              <Link href="/signin">
                <span className="font-semibold text-sm">Signin</span>
              </Link>
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  {...register("name", { required: "Name is required" })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Signup
            </Button>
            <span className="flex items-center justify-center gap-2 mt-2">
              <Button
                variant="outline"
                className="cursor-pointer text-white w-2/4"
              >
                <GoogleIcon fontSize="small" />
              </Button>
              <Button
                onClick={() => console.log("clicked")}
                variant="outline"
                className="cursor-pointer text-white w-2/4"
              >
                <GitHubIcon fontSize="small" />
              </Button>
            </span>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default Signup;
