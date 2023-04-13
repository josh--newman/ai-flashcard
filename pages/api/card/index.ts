import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import prisma from "../../../lib/prisma";

// POST /api/card
// Optional fields in body: front, back
export default async function handle(req, res) {
  const { front, back } = req.body;

  const session = await getServerSession(req, res, authOptions);

  // Create a new card and assignment
  const result = await prisma.card.create({
    data: {
      front,
      back,
      User: { connect: { email: session?.user?.email } },
      Assignment: {
        create: {},
      },
    },
  });

  res.json(result);
}
