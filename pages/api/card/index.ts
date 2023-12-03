import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../utils/auth";
import prisma from "../../../lib/prisma";

// POST /api/card
// Fields in body: front, back, targetWord
export default async function handle(req, res) {
  const { front, back, targetWord } = req.body;

  if (!front || !back || !targetWord) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (!front.includes(targetWord)) {
    return res
      .status(400)
      .json({ error: "Target word not found in front of card" });
  }

  const session = await getServerSession(req, res, authOptions);

  // Create a new card and assignment
  const result = await prisma.card.create({
    data: {
      front,
      back,
      targetWord,
      User: { connect: { email: session?.user?.email } },
      Assignment: {
        create: {},
      },
    },
  });

  res.json(result);
}
