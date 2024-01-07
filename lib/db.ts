/**
 * Imports PrismaClient and declares a global prisma variable to prevent unnecessary re-creation of the client during hot reloading in development.
 * Exports a db constant that is set to globalThis.prisma if it exists, otherwise creates a new PrismaClient instance.
 * In development, sets globalThis.prisma to the db instance to enable hot reloading.
 */
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
