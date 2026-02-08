import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { LoginValidation } from "@/validations/AuthValidation";
import connectDB from "@/lib/connectDB";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    connectDB();
    const body = await req.json();
    const validatedData = LoginValidation.parse(body);

    const { email, password } = validatedData;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please enter email and password" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        {
          message:
            "User with this email is not registered please register first",
        },
        { status: 400 },
      );
    }

    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (!isPasswordSame) {
      return NextResponse.json(
        {
          message: "Invalid email or password. Try again",
        },
        { status: 400 },
      );
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: "An unknown error occured",
        error,
      },
      { status: 500 },
    );
  }
}
