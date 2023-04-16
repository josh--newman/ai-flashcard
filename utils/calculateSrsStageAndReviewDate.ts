import { Assignment } from "@prisma/client";
import { add } from "date-fns";

const roundToHourCeil = (date: Date) => {
  // Bail early if we're already on the hour
  if (date.getMinutes() === 0) {
    return date;
  }

  date.setHours(date.getHours() + 1);
  date.setMinutes(0, 0, 0);
  return date;
};

// Time in hours between reviews
const timeIntervalsMap = {
  1: 4,
  2: 8,
  3: 24, // 1 day
  4: 48, // 2 days
  5: 168, // 1 week
  6: 336, // 2 weeks
  7: 730, // 1 month
  8: 2920, // 4 months
};

export const calculateSrsStageAndReviewDate = (
  success: boolean,
  numFailures: number,
  assignment: Pick<Assignment, "srsStage">
) => {
  // Shamelessly taken from Wanikani: https://knowledge.wanikani.com/wanikani/srs-stages/
  const incorrectAdjustmentCount = Math.ceil(numFailures / 2);
  const srsPenaltyFactor = assignment.srsStage >= 5 ? 2 : 1;

  const newSrsStage = success
    ? assignment.srsStage + 1
    : assignment.srsStage - incorrectAdjustmentCount * srsPenaltyFactor;

  const hours = timeIntervalsMap[newSrsStage];

  const newReviewDate = roundToHourCeil(add(Date.now(), { hours }));

  return {
    newSrsStage: newSrsStage,
    newReviewDate: newSrsStage === 9 ? null : newReviewDate,
  };
};
