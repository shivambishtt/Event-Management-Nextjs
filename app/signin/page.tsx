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
import { signIn } from "next-auth/react";

interface SigninInputs {
  email: string;
  password: string;
}

function SignIn() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SigninInputs>();

  const onsubmit: SubmitHandler<SigninInputs> = async (data) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <Card className="w-full max-w-sm mx-auto mt-6 px-10">
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl font-semibold w-full">
                Login to your account
              </h2>
            </CardTitle>
            <p className="mx-auto -my-1">
              Dont have an account?{" "}
              <Link href="/signup">
                <span className="font-semibold text-sm">Signup</span>
              </Link>
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
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
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
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
              Login
            </Button>
            <span className="flex items-center justify-center gap-2 mt-2">
              <Button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                variant="outline"
                className="cursor-pointer text-white w-2/4"
              >
                <GoogleIcon fontSize="small" />
              </Button>
              <Button
                type="button"
                onClick={() => signIn("github", { callbackUrl: "/" })}
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

export default SignIn;
