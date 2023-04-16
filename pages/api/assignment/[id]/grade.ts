import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";
import prisma from "../../../../lib/prisma";
import { calculateSrsStageAndReviewDate } from "../../../../utils/calculateSrsStageAndReviewDate";

// POST /api/assignment/:id/grade
// Required fields in body: success, numFailures
export default async function handle(req, res) {
  const { success, numFailures } = req.body;

  console.log("GRADE ASSIGNMENT");

  const session = await getServerSession(req, res, authOptions);

  const assignment = await prisma.assignment.findUnique({
    where: {
      id: req.query.id,
    },
  });

  if (!assignment) {
    return res.status(404).json({ error: "Assignment not found" });
  }

  // Grade assignment
  // If success, increment the assignments srsStage
  // If failure, decrement the assignments srsStage
  // Calculate the next reviewDate
  // Create a review object

  const { newSrsStage, newReviewDate } = calculateSrsStageAndReviewDate(
    success,
    numFailures,
    assignment
  );

  // prisma.assignment.update({
  //   data: {},
  //   where: {
  //     id: req.query.id,
  //   },
  // });

  return res.json({ success });
}
