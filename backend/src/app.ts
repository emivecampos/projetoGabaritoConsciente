import express from "express";

import { questionsRoutes } from "./modules/questions/questions.routes";
import { answerRoutes } from "./modules/answers/answer.routes";

export const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  return res.json({
    status: "ok",
  });
});

app.use("/questions", questionsRoutes);
app.use("/answers", answerRoutes);