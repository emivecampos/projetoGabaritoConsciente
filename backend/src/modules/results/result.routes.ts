import { Router } from "express";

import {
  getResults,
  getStats,
  getStatsByDiscipline,
  getStatsByYear,
} from "./result.controller";

export const resultRoutes = Router();

resultRoutes.get("/", getResults);

resultRoutes.get("/stats", getStats);

resultRoutes.get(
  "/stats/by-discipline",
  getStatsByDiscipline
);

resultRoutes.get(
  "/stats/by-year",
  getStatsByYear
);