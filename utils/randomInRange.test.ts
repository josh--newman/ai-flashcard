import randomInRange from "./randomInRange";

describe("randomInRange", () => {
  it("should return a random number within the specified range", () => {
    const seed = 42;
    const minRange = 1;
    const maxRange = 100;
    const randomNumber = randomInRange(minRange, maxRange, seed);

    expect(randomNumber).toBeGreaterThanOrEqual(minRange);
    expect(randomNumber).toBeLessThanOrEqual(maxRange);
  });

  it("should return the same random number when using the same seed", () => {
    const seed = 42;
    const minRange = 1;
    const maxRange = 100;
    const randomNumber1 = randomInRange(minRange, maxRange, seed);
    const randomNumber2 = randomInRange(minRange, maxRange, seed);

    expect(randomNumber1).toEqual(randomNumber2);
  });

  it("should generate different random numbers with different seeds", () => {
    const minRange = 1;
    const maxRange = 100;
    const seed1 = 42;
    const seed2 = 84;
    const randomNumber1 = randomInRange(minRange, maxRange, seed1);
    const randomNumber2 = randomInRange(minRange, maxRange, seed2);

    expect(randomNumber1).not.toEqual(randomNumber2);
  });

  it("should handle negative range correctly", () => {
    const seed = 42;
    const minRange = -50;
    const maxRange = -20;
    const randomNumber = randomInRange(minRange, maxRange, seed);

    expect(randomNumber).toBeGreaterThanOrEqual(minRange);
    expect(randomNumber).toBeLessThanOrEqual(maxRange);
  });

  it("should return the minimum value when minRange and maxRange are the same", () => {
    const seed = 42;
    const minRange = 5;
    const maxRange = 5;
    const randomNumber = randomInRange(minRange, maxRange, seed);

    expect(randomNumber).toEqual(minRange);
  });

  it("should return an integer value within the range", () => {
    const seed = 42;
    const minRange = 1;
    const maxRange = 100;
    const randomNumber = randomInRange(minRange, maxRange, seed);

    expect(Number.isInteger(randomNumber)).toBeTruthy();
  });
});
