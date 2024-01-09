/**
 * Creates a new course.
 *
 * Requires authentication via Clerk.
 *
 * Expects a POST request with a JSON body containing the course title.
 *
 * Returns the created course object on success.
 *
 * Returns 401 Unauthorized if not authenticated.
 *
 * Returns 500 Internal Server Error on any other errors.
 */
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[courses]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
