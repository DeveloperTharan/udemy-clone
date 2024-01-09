import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { url } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const courseWoner = await db.course.findUnique({
      where: { id: params.courseId, userId },
    });

    if (!courseWoner) return new NextResponse("Unauthorized", { status: 401 });

    const attachment = await db.attachment.create({
      data: {
        url,
        courseId: params.courseId,
        name: url.split("/").pop(),
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log(["COURSE_ATTACHMENTS"], error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
