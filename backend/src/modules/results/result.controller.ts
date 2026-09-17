import { Request, Response } from "express";

import {
  getResultsStats,
  listResults,
} from "./result.service";

export function getResults(
  _req: Request,
  res: Response
) {
  const results = listResults();

  return res.json(results);
}

export function getStats(
  _req: Request,
  res: Response
) {
  const stats = getResultsStats();

  return res.json(stats);
}