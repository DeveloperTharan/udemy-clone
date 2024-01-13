import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { user: string } }
  ) {
    try {
      const { userId } = auth();
      const { user } = params;
      const values = await req.json();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const course = await db.user.update({
        where: {
          id: user,
          userId,
        },
        data: {
          ...values,
        },
      });
  
      return NextResponse.json(course);
    } catch (error) {
      console.log("[USER]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }