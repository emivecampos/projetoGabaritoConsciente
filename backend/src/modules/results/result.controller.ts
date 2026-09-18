import { Request, Response } from "express";

import {
  getResultsStats,
  getResultsStatsByDiscipline,
  getResultsStatsByYear,
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

export function getStatsByDiscipline(
  _req: Request,
  res: Response
) {
  const stats = getResultsStatsByDiscipline();

  return res.json(stats);
}

export function getStatsByYear(
  _req: Request,
  res: Response
) {
  const stats = getResultsStatsByYear();

  return res.json(stats);
}