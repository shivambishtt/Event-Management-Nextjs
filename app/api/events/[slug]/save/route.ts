import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Event from "@/models/EventModel";
import { getServerSession } from "next-auth";
import User from "@/models/UserModel";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDB();

    const { slug } = await params;
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized request" },
        { status: 401 },
      );
    }

    const event = await Event.findOne({ slug });
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const alreadySaved = user.savedEvents.includes(event._id);

    if (alreadySaved) {
      user.savedEvents.pull(event._id);
    } else {
      user.savedEvents.push(event._id);
    }

    await user.save();

    return NextResponse.json({
      saved: !alreadySaved,
      message: "Saved event updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "An unknown error occured" },
      { status: 500 },
    );
  }
}
