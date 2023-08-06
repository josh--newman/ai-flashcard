// LCG constants (these values are often used in LCG)
const m = 2 ** 31 - 1; // 2^31 - 1 (a large prime number)
const a = 1103515245;
const c = 12345;

// Function to generate a random number using LCG with a seed
const random = (seed: number) => {
  let state = seed;
  return () => {
    state = (a * state + c) % m;
    return state / m;
  };
};

// Function to generate a random number within a given range
const randomInRange = (min: number, max: number, seed: number) => {
  const generator = random(seed);
  const randomNum = generator();
  return Math.floor(min + randomNum * (max - min + 1));
};

export default randomInRange;
