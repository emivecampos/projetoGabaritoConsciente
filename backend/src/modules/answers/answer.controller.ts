import type { Request, Response } from "express";
import { checkAnswer } from "./answer.service";

export async function submitAnswer(
  req: Request,
  res: Response
) {
  try {
    const {
      year,
      questionIndex,
      alternative,
    } = req.body;

    if (
      typeof year !== "number" ||
      typeof questionIndex !== "number" ||
      typeof alternative !== "string"
    ) {
      return res.status(400).json({
        message: "Dados inválidos",
      });
    }

    const result = await checkAnswer({
      year,
      questionIndex,
      alternative,
    });

    return res.json(result);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao validar resposta",
    });
  }
}