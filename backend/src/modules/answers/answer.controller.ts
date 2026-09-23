import type { Request, Response } from "express";

import {
  checkAnswer,
  QuestionNotFoundError,
} from "./answer.service";

export async function submitAnswer(
  req: Request,
  res: Response
) {
  try {
    const {
      year,
      offset,
      alternative,
    } = req.body;

    if (
      typeof year !== "number" ||
      typeof offset !== "number" ||
      typeof alternative !== "string"
    ) {
      return res.status(400).json({
        message: "Dados inválidos",
      });
    }

    if (!Number.isInteger(year) || year <= 0) {
      return res.status(400).json({
        message: "year deve ser um inteiro maior que 0",
      });
    }

    if (!Number.isInteger(offset) || offset < 0) {
      return res.status(400).json({
        message:
          "offset deve ser um inteiro maior ou igual a 0",
      });
    }

    const normalizedAlternative =
      alternative.trim().toUpperCase();

    if (
      !["A", "B", "C", "D", "E"].includes(
        normalizedAlternative
      )
    ) {
      return res.status(400).json({
        message:
          "alternative deve ser A, B, C, D ou E",
      });
    }

    const result = await checkAnswer({
      year,
      offset,
      alternative: normalizedAlternative,
    });

    return res.json(result);
  } catch (error) {
    if (error instanceof QuestionNotFoundError) {
      return res.status(404).json({
        message: error.message,
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Erro ao validar resposta",
    });
  }
}