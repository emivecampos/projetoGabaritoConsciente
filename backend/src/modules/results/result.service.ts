import { randomUUID } from "node:crypto";
import { Result } from "./result.types";

const results: Result[] = [];

type CreateResultInput = {
  year: number;
  discipline: string;
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
    discipline: input.discipline,
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

export function getResultsStatsByDiscipline() {
  const stats = new Map<
    string,
    {
      total: number;
      correct: number;
    }
  >();

  for (const result of results) {
    const current = stats.get(result.discipline) ?? {
      total: 0,
      correct: 0,
    };

    current.total += 1;

    if (result.correct) {
      current.correct += 1;
    }

    stats.set(result.discipline, current);
  }

  return Array.from(stats.entries()).map(
    ([discipline, data]) => ({
      discipline,
      total: data.total,
      correct: data.correct,
      incorrect: data.total - data.correct,
      accuracy: Number(
        ((data.correct / data.total) * 100).toFixed(2)
      ),
    })
  );
}

export function getResultsStatsByYear() {
  const stats = new Map<
    number,
    {
      total: number;
      correct: number;
    }
  >();

  for (const result of results) {
    const current = stats.get(result.year) ?? {
      total: 0,
      correct: 0,
    };

    current.total += 1;

    if (result.correct) {
      current.correct += 1;
    }

    stats.set(result.year, current);
  }

  return Array.from(stats.entries()).map(
    ([year, data]) => ({
      year,
      total: data.total,
      correct: data.correct,
      incorrect: data.total - data.correct,
      accuracy: Number(
        ((data.correct / data.total) * 100).toFixed(2)
      ),
    })
  );
}