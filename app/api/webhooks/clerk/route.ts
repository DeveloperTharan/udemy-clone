import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

/**
 * Handles Clerk webhook events.
 *
 * Verifies the webhook request signature and processes user create, update and delete events.
 * Creates, updates or deletes the user in the database accordingly.
 *
 * Returns 200 OK response on success.
 */
export async function POST(req: Request) {
  //checking Webhooks secret is there or not
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the event-type
  const eventType = evt.type;

  // if user created then pass the following data to the Database
  if (eventType === "user.created") {
    const user = await db.user.create({
      data: {
        userId: payload?.data?.id,
        firstName: payload?.data?.first_name,
        lastName: payload?.data?.last_name,
        imageURL: payload?.data?.image_url,
        email: payload?.data?.email_addresses[0]?.email_address,
      },
    });
  }
  return new Response("", { status: 200 });
}
