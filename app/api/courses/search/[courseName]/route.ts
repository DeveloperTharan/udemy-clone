/**
 * Search for courses by name.
 *
 * This API endpoint allows searching for courses by name. It takes the course name from the route parameter "name" and queries the database to find courses with a title that contains the name (case insensitive).
 *
 * The matching courses are returned in the JSON response, limited to 5 results. If there is an error, it will return a 500 status response with an error message.
 */
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const res = await db.course.findMany({
      take: 10,
      where: {
        title: {
          contains: params.name,
          mode: "default",
        },
      },
      include: {
        category: true,
      }
    });

    return NextResponse.json(res);
  } catch (error) {
    console.log("[course_search]]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
