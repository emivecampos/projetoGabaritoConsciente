import { randomUUID } from "node:crypto";
import { Result } from "./result.types";

const results: Result[] = [];

type CreateResultInput = {
  year: number;
  questionIndex: number;
  selectedAlternative: string;
  correctAlternative: string;
  correct: boolean;
};

export function createResult(
  input: CreateResultInput
): Result {
  const result: Result = {
    id: randomUUID(),
    year: input.year,
    questionIndex: input.questionIndex,
    selectedAlternative: input.selectedAlternative,
    correctAlternative: input.correctAlternative,
    correct: input.correct,
    answeredAt: new Date(),
  };

  results.push(result);

  return result;
}

export function listResults(): Result[] {
  return results;
}

export function getResultsStats() {
  const total = results.length;

  const correct = results.filter(
    (result) => result.correct
  ).length;

  const incorrect = total - correct;

  const accuracy =
    total === 0
      ? 0
      : Number(((correct / total) * 100).toFixed(2));

  return {
    total,
    correct,
    incorrect,
    accuracy,
  };
}