export const bmiCalculator = (
  personHeight: number,
  personMass: number
): string => {
  const heightInCm = personHeight / 100;

  const result = personMass / Math.pow(heightInCm, 2);

  if (result < 18.5) return "Low Weight";
  else if (result > 18.5 && result < 25) return "Normal (healthy weight)";
  else return "Over weight";
};

console.log(bmiCalculator(180, 74));
