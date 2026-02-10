import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";

export async function GET(req: NextRequest) {
  try {
    connectDB();

    const response = NextResponse.json({
      message: "Logged out successfully",
      status: 200,
    });
    response.cookies.set("token", "", {
      maxAge: 0,
      path: "/",
    });
    return response;
  } catch (error) {
    return NextResponse.json({
      message: "An unknown error occured",
      status: 500,
      error,
    });
  }
}
