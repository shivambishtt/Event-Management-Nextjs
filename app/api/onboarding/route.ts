import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { Resend } from "resend";
import OnbardingEmail from "@/email/OnbardingEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    connectDB();

    const { name, email } = await req.json();
    if (!name || !email) {
      return NextResponse.json({
        message: "Please enter name and email",
        status: 400,
      });
    }

    const { data, error } = await resend.emails.send({
      from: "Eve<onboarding@resend.dev>",
      to: [email],
      subject: "Let’s begin",
      react: OnbardingEmail({
        name: name,
        email: email,
      }),
    });

    return NextResponse.json({
      message: "Email sent successfully",
      success: true,
      status: 200,
      data,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An unknown error occured",
      status: 500,
      error,
    });
  }
}
