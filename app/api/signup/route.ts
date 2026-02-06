import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { SignupValidation } from "@/validations/AuthValidation";
import connectDB from "@/lib/connectDB";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const validatedData = SignupValidation.parse(body);

    const { email, name, password } = validatedData;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      provider: "credentials",
    });

    if (!user) {
      return NextResponse.json(
        { message: "Error occured while creating the user" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "User created sucessfully", user },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An unknown error occured ", error },
      { status: 500 },
    );
  }
}
