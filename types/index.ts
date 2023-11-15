import { Assignment, Card as PrismaCard } from "@prisma/client";

type WithoutDates<T> = Omit<T, "createdAt" | "updatedAt">;

export type Card = WithoutDates<PrismaCard> & {
  Assignment: Pick<Assignment, "id">;
};