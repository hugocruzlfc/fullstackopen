import express from "express";
import { bmiCalculator } from "./bmiCalculator";
const app = express();

app.get("/home", (_req, res) => {
  res.send("Hello Full Stack!");
});
app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (height && weight) {
    const response = bmiCalculator(+height, +weight);
    res.json({ response });
  } else
    res.json({
      error: "malformatted parameters",
    });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
