import { Assignment } from "@prisma/client";
import { calculateSrsStageAndReviewDate } from "./calculateSrsStageAndReviewDate";

describe("calculateSrsStageAndReviewDate", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-01-01T00:00:00.000Z"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe("adds the correct amount of hours", () => {
    it("stage 0 (new) -> 1", () => {
      expect(
        calculateSrsStageAndReviewDate(true, 0, {
          srsStage: 0,
        })
      ).toEqual({
        newSrsStage: 1,
        newReviewDate: new Date("2023-01-01T04:00:00.000Z"),
      });
    });

    it("stage 1 -> 2", () => {
      expect(
        calculateSrsStageAndReviewDate(true, 0, {
          srsStage: 1,
        })
      ).toEqual({
        newSrsStage: 2,
        newReviewDate: new Date("2023-01-01T08:00:00.000Z"),
      });
    });

    it("stage 2 -> 3", () => {
      expect(
        calculateSrsStageAndReviewDate(true, 0, {
          srsStage: 2,
        })
      ).toEqual({
        newSrsStage: 3,
        newReviewDate: new Date("2023-01-02T00:00:00.000Z"),
      });
    });

    it("stage 3 -> 4", () => {
      expect(
        calculateSrsStageAndReviewDate(true, 0, {
          srsStage: 3,
        })
      ).toEqual({
        newSrsStage: 4,
        newReviewDate: new Date("2023-01-03T00:00:00.000Z"),
      });
    });

    it("stage 4 -> 5", () => {
      expect(
        calculateSrsStageAndReviewDate(true, 0, {
          srsStage: 4,
        })
      ).toEqual({
        newSrsStage: 5,
        newReviewDate: new Date("2023-01-08T00:00:00.000Z"),
      });
    });

    it("stage 5 -> 6", () => {
      expect(
        calculateSrsStageAndReviewDate(true, 0, {
          srsStage: 5,
        })
      ).toEqual({
        newSrsStage: 6,
        newReviewDate: new Date("2023-01-15T00:00:00.000Z"),
      });
    });

    it("stage 6 -> 7", () => {
      expect(
        calculateSrsStageAndReviewDate(true, 0, {
          srsStage: 6,
        })
      ).toEqual({
        newSrsStage: 7,
        newReviewDate: new Date("2023-01-31T10:00:00.000Z"),
      });
    });

    it("stage 7 -> 8", () => {
      expect(
        calculateSrsStageAndReviewDate(true, 0, {
          srsStage: 7,
        })
      ).toEqual({
        newSrsStage: 8,
        newReviewDate: new Date("2023-05-02T16:00:00.000Z"),
      });
    });

    it("stage 8 -> 9 (burned)", () => {
      expect(
        calculateSrsStageAndReviewDate(true, 0, {
          srsStage: 8,
        })
      ).toEqual({
        newSrsStage: 9,
        newReviewDate: null,
      });
    });
  });

  describe("always rounds to the top of the hour", () => {
    it("first half of the hour", () => {
      jest.setSystemTime(new Date("2023-01-01T00:21:00.000Z"));
      expect(
        calculateSrsStageAndReviewDate(true, 0, {
          srsStage: 2,
        })
      ).toEqual({
        newSrsStage: 3,
        newReviewDate: new Date("2023-01-02T01:00:00.000Z"),
      });
    });

    it("exactly at half past the hour", () => {
      jest.setSystemTime(new Date("2023-01-01T00:30:00.000Z"));
      expect(
        calculateSrsStageAndReviewDate(true, 0, {
          srsStage: 2,
        })
      ).toEqual({
        newSrsStage: 3,
        newReviewDate: new Date("2023-01-02T01:00:00.000Z"),
      });
    });

    it("second half of the hour", () => {
      jest.setSystemTime(new Date("2023-01-01T00:47:00.000Z"));
      expect(
        calculateSrsStageAndReviewDate(true, 0, {
          srsStage: 2,
        })
      ).toEqual({
        newSrsStage: 3,
        newReviewDate: new Date("2023-01-02T01:00:00.000Z"),
      });
    });
  });

  it("handles failures", () => {
    const assignment = {
      srsStage: 3,
    };

    const result = calculateSrsStageAndReviewDate(false, 1, assignment);
    expect(result.newSrsStage).toBe(2);
    expect(result.newReviewDate).toEqual(new Date("2023-01-01T09:00:00.000Z"));
  });
});
