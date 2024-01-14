/**
 * API route handlers for user data operations.
 *
 * Exports PATCH and DELETE handlers:
 *
 * PATCH - Updates user data. Authenticates the user, validates input, updates the database, and returns the updated data.
 *
 * DELETE - Deletes a user. Authenticates, validates, deletes from database and Clerk, and returns a confirmation message.
 */
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";

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

export async function DELETE(
  req: Request,
  { params }: { params: { user: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { user } = params;

    await db.user.delete({
      where: {
        id: user,
        userId,
      },
    });

    await clerkClient.users.deleteUser(userId);

    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.log("[USER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
