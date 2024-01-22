/**
 * Imports the Stripe API client and initializes a new Stripe client instance with the
 * STRIPE_API_KEY environment variable.
 *
 * Exports the Stripe client instance to be used by other parts of the application.
 */
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
});
