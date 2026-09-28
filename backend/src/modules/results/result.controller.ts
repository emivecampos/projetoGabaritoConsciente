import type { Request, Response } from "express";

import {
  getResultById,
  getResultsStats,
  getResultsStatsByDiscipline,
  getResultsStatsByYear,
  listResults,
} from "./result.service";

export async function getResults(
  req: Request,
  res: Response
) {
  try {
    const yearParam = req.query.year;
    const disciplineParam =
      req.query.discipline;
    const limitParam = req.query.limit;
    const offsetParam = req.query.offset;

    let year: number | undefined;
    let discipline: string | undefined;

    let limit = 10;
    let offset = 0;

    if (yearParam !== undefined) {
      year = Number(yearParam);

      if (
        !Number.isInteger(year) ||
        year <= 0
      ) {
        return res.status(400).json({
          message:
            "year deve ser um inteiro maior que 0",
        });
      }
    }

    if (disciplineParam !== undefined) {
      if (
        typeof disciplineParam !== "string"
      ) {
        return res.status(400).json({
          message: "discipline inválida",
        });
      }

      discipline = disciplineParam.trim();

      if (!discipline) {
        return res.status(400).json({
          message:
            "discipline não pode ser vazia",
        });
      }
    }

    if (limitParam !== undefined) {
      limit = Number(limitParam);

      if (
        !Number.isInteger(limit) ||
        limit <= 0
      ) {
        return res.status(400).json({
          message:
            "limit deve ser um inteiro maior que 0",
        });
      }

      if (limit > 100) {
        return res.status(400).json({
          message:
            "limit não pode ser maior que 100",
        });
      }
    }

    if (offsetParam !== undefined) {
      offset = Number(offsetParam);

      if (
        !Number.isInteger(offset) ||
        offset < 0
      ) {
        return res.status(400).json({
          message:
            "offset deve ser um inteiro maior ou igual a 0",
        });
      }
    }

    const {
      total,
      results,
    } = await listResults({
      year,
      discipline,
      limit,
      offset,
    });

    const hasMore =
      offset + results.length < total;

    return res.json({
      metadata: {
        total,
        limit,
        offset,
        hasMore,
      },
      results,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message:
        "Erro ao buscar resultados",
    });
  }
}

export async function getResult(
  req: Request,
  res: Response
) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        message:
          "ID do resultado é obrigatório",
      });
    }

    const result = await getResultById(id);

    if (!result) {
      return res.status(404).json({
        message: "Resultado não encontrado",
      });
    }

    return res.json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message:
        "Erro ao buscar resultado",
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
      message:
        "Erro ao buscar estatísticas",
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