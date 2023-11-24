interface Data {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  hoursInTrainingDay: number[],
  targetPerDay: number
): Data => {
  const trainingDays = hoursInTrainingDay.reduce(
    (acc, day) => (day !== 0 ? acc + 1 : acc),
    0
  );

  const totalHoursTrained = hoursInTrainingDay.reduce((a, b) => a + b, 0);

  const average = Math.round(totalHoursTrained / hoursInTrainingDay.length);

  const rateInPeriod = hoursInTrainingDay.length * targetPerDay;

  let rating, ratingDescription;

  if (totalHoursTrained < rateInPeriod) {
    rating = 1;
    ratingDescription = "You need to try a little harder";
  } else if (totalHoursTrained === rateInPeriod) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "Excellent, keep it up";
  }

  const response: Data = {
    periodLength: hoursInTrainingDay.length,
    trainingDays,
    average,
    target: targetPerDay,
    success: totalHoursTrained < rateInPeriod ? false : true,
    rating,
    ratingDescription,
  };

  return response;
};

console.log(calculateExercises([3, 4, 2, 4.5, 5, 3, 1], 2));
