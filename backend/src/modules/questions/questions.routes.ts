import { Router } from "express";

import { getQuestionsByEnemYear } from "./questions.controller";

export const questionsRoutes = Router();

questionsRoutes.get(
  "/enem/:year",
  getQuestionsByEnemYear
);