import { Router } from "express";

import {
  getResults,
  getStats,
} from "./result.controller";

export const resultRoutes = Router();

resultRoutes.get("/", getResults);
resultRoutes.get("/stats", getStats);