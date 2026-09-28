import { db } from "../../prisma/db";

type CreateResultInput = {
  year: number;
  discipline: string;
  questionIndex: number;
  selectedAlternative: string;
  correctAlternative: string;
  correct: boolean;
};

type ResultFilters = {
  year?: number;
  discipline?: string;
  limit?: number;
  offset?: number;
};

export async function createResult(
  input: CreateResultInput
) {
  const result = await db.orm.public.Result.create({
    year: input.year,
    discipline: input.discipline,
    questionIndex: input.questionIndex,
    selectedAlternative: input.selectedAlternative,
    correctAlternative: input.correctAlternative,
    correct: input.correct,
  });

  return result;
}

export async function listResults(
  filters: ResultFilters = {}
) {
  let query = db.orm.public.Result;

  if (filters.year !== undefined) {
    query = query.where({
      year: filters.year,
    });
  }

  if (filters.discipline !== undefined) {
    query = query.where({
      discipline: filters.discipline,
    });
  }

  const totalStats = await query.aggregate(
    (agg) => ({
      total: agg.count(),
    })
  );

  let paginatedQuery = query.orderBy(
    (result) => result.answeredAt.desc()
  );

  if (filters.offset !== undefined) {
    paginatedQuery = paginatedQuery.offset(
      filters.offset
    );
  }

  if (filters.limit !== undefined) {
    paginatedQuery = paginatedQuery.limit(
      filters.limit
    );
  }

  const results = await paginatedQuery.all();

  return {
    total: totalStats.total,
    results,
  };
}

export async function getResultById(id: string) {
  const result =
    await db.orm.public.Result.first({
      id,
    });

  return result;
}

export async function getResultsStats() {
  const stats = await db.orm.public.Result.aggregate(
    (agg) => ({
      total: agg.count(),
    })
  );

  const correctStats =
    await db.orm.public.Result
      .where({
        correct: true,
      })
      .aggregate((agg) => ({
        correct: agg.count(),
      }));

  const total = stats.total;
  const correct = correctStats.correct;
  const incorrect = total - correct;

  const accuracy =
    total === 0
      ? 0
      : Number(
          ((correct / total) * 100).toFixed(2)
        );

  return {
    total,
    correct,
    incorrect,
    accuracy,
  };
}

export async function getResultsStatsByDiscipline() {
  const grouped =
    await db.orm.public.Result
      .groupBy("discipline")
      .aggregate((agg) => ({
        total: agg.count(),
      }));

  const results = [];

  for (const group of grouped) {
    const correctStats =
      await db.orm.public.Result
        .where({
          discipline: group.discipline,
          correct: true,
        })
        .aggregate((agg) => ({
          correct: agg.count(),
        }));

    const correct = correctStats.correct;
    const incorrect = group.total - correct;

    const accuracy =
      group.total === 0
        ? 0
        : Number(
            (
              (correct / group.total) *
              100
            ).toFixed(2)
          );

    results.push({
      discipline: group.discipline,
      total: group.total,
      correct,
      incorrect,
      accuracy,
    });
  }

  return results;
}

export async function getResultsStatsByYear() {
  const grouped =
    await db.orm.public.Result
      .groupBy("year")
      .aggregate((agg) => ({
        total: agg.count(),
      }));

  const results = [];

  for (const group of grouped) {
    const correctStats =
      await db.orm.public.Result
        .where({
          year: group.year,
          correct: true,
        })
        .aggregate((agg) => ({
          correct: agg.count(),
        }));

    const correct = correctStats.correct;
    const incorrect = group.total - correct;

    const accuracy =
      group.total === 0
        ? 0
        : Number(
            (
              (correct / group.total) *
              100
            ).toFixed(2)
          );

    results.push({
      year: group.year,
      total: group.total,
      correct,
      incorrect,
      accuracy,
    });
  }

  return results;
}