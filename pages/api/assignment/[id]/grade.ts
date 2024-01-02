import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../utils/auth";
import prisma from "../../../../lib/prisma";
import { calculateSrsStageAndReviewDate } from "../../../../utils/calculateSrsStageAndReviewDate";

// POST /api/assignment/:id/grade
// Required fields in body: success, numFailures
export default async function handle(req, res) {
  const { success, numFailures } = req.body;

  const session = await getServerSession(req, res, authOptions);

  const assignment = await prisma.assignment.findUnique({
    where: {
      id: req.query.id,
    },
    include: {
      Card: {
        include: {
          User: true,
        },
      },
    },
  });

  if (!assignment) {
    return res.status(404).json({ error: "Assignment not found" });
  }

  if (assignment.Card.User.email !== session.user.email) {
    return res.status(403).json({ error: "Not authorized" });
  }

  const { newSrsStage, newReviewDate } = calculateSrsStageAndReviewDate(
    success,
    numFailures,
    assignment
  );

  if (newSrsStage < 1) {
    return res.status(400).json({ error: "SRS stage cannot be below 1" });
  }

  const result = await prisma.assignment.update({
    data: {
      srsStage: newSrsStage,
      availableAt: newReviewDate,
      started_at: assignment.started_at ?? new Date(),
      Reviews: {
        create: {
          startingSrsStage: assignment.srsStage,
          endingSrsStage: newSrsStage,
          incorrectAnswers: numFailures,
          cardId: assignment.cardId,
        },
      },
    },
    where: {
      id: req.query.id,
    },
  });

  return res.json(result);
}
