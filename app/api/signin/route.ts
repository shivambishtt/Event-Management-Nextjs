import connectDB from "@/lib/connectDB";
import User from "@/models/UserModel";
import { LoginValidation } from "@/validations/AuthValidation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const validatedData = LoginValidation.parse(body);

    const { email, password } = validatedData;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { message: "User not registered" },
        { status: 400 },
      );
    }

    const isPasswordSame = bcrypt.compare(password, user.password);
    if (!isPasswordSame) {
      return NextResponse.json(
        { message: "Invalid email or password" },
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
    })
    return response;
  } catch (error: any) {
    console.error("Signin error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
