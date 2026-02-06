import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { LoginValidation } from "@/validations/AuthValidation";
import connectDB from "@/lib/connectDB";
import bcrypt from "bcrypt";

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
