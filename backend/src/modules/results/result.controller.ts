import type { Request, Response } from "express";

import {
  getResultsStats,
  getResultsStatsByDiscipline,
  getResultsStatsByYear,
  listResults,
} from "./result.service";

export async function getResults(
  _req: Request,
  res: Response
) {
  try {
    const results = await listResults();

    return res.json(results);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao buscar resultados",
    });
  }
}

export async function getStats(
  _req: Request,
  res: Response
) {
  try {
    const stats = await getResultsStats();

    return res.json(stats);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao buscar estatísticas",
    });
  }
}

export async function getStatsByDiscipline(
  _req: Request,
  res: Response
) {
  try {
    const stats =
      await getResultsStatsByDiscipline();

    return res.json(stats);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message:
        "Erro ao buscar estatísticas por disciplina",
    });
  }
}

export async function getStatsByYear(
  _req: Request,
  res: Response
) {
  try {
    const stats =
      await getResultsStatsByYear();

    return res.json(stats);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message:
        "Erro ao buscar estatísticas por ano",
    });
  }
}