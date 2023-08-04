import { Assignment, Card as PrismaCard } from "@prisma/client";

export type Card = PrismaCard & {
  Assignment: Assignment;
};
