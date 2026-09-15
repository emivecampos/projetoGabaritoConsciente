import { Request, Response } from "express";

import {
  EnemRateLimitError,
  getEnemQuestions,
} from "./enem.service";

export async function getQuestionsByEnemYear(
  req: Request,
  res: Response
) {
  try {
    const year = Number(req.params.year);

    const limit = Number(req.query.limit ?? 10);
    const offset = Number(req.query.offset ?? 0);

    if (Number.isNaN(year)) {
      return res.status(400).json({
        message: "Ano inválido",
      });
    }

    if (
      !Number.isInteger(limit) ||
      limit <= 0
    ) {
      return res.status(400).json({
        message: "limit deve ser um inteiro maior que 0",
      });
    }

    if (
      !Number.isInteger(offset) ||
      offset < 0
    ) {
      return res.status(400).json({
        message: "offset deve ser um inteiro maior ou igual a 0",
      });
    }

    const data = await getEnemQuestions(
      year,
      limit,
      offset
    );

    return res.json(data);

  } catch (error) {

    if (error instanceof EnemRateLimitError) {
      if (error.retryAfter) {
        res.setHeader(
          "Retry-After",
          error.retryAfter
        );
      }

      return res.status(429).json({
        message:
          "A API do ENEM recebeu muitas requisições. Tente novamente em alguns instantes.",
        retryAfter: error.retryAfter,
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Erro ao buscar questões do ENEM",
    });
  }
}