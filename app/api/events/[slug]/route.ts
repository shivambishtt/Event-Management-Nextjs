import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database";
import Event from "@/models/EventModel";

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};
export async function GET(
  req: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse> {
  try {
    await connectDB();
    const { slug } = await params;

    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        {
          message: "Invalid or missing slug parameter",
        },
        {
          status: 400,
        },
      );
    }

    const event = await Event.findOne({
      slug,
    });

    if (event?.isExpired === true) {
      return NextResponse.json(
        { message: "This event has been expired", event },
        { status: 200 },
      );
    }
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Event found successfully", event },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An unknown error occured", error },
      { status: 500 },
    );
  }
}
