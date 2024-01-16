/**
 * POST handler for /api/courses route.
 * Creates a new course.
 * Authenticates user with Clerk auth middleware.
 * Validates request body and user auth.
 * Creates new course in DB and returns response.
 * Handles any errors.
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

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courses = await db.course.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    const category = await db.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json([courses, category]);
  } catch (error) {
    console.log("[courses]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
