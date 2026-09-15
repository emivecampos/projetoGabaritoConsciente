import { EnemQuestionsResponse } from "./enem.types";

import {
  getCachedEnemQuestions,
  setCachedEnemQuestions,
} from "./enem.cache";

const ENEM_API_URL = "https://api.enem.dev/v1";

export class EnemRateLimitError extends Error {
  constructor(
    public retryAfter: string | null
  ) {
    super("Limite de requisições da API ENEM excedido");
    this.name = "EnemRateLimitError";
  }
}

export async function getEnemQuestions(
  year: number,
  limit = 10,
  offset = 0
): Promise<EnemQuestionsResponse> {
  const cacheKey = `${year}:${limit}:${offset}`;

  const cachedData = getCachedEnemQuestions(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const url = new URL(
    `${ENEM_API_URL}/exams/${year}/questions`
  );

  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));

  const response = await fetch(url);

  if (response.status === 429) {
    throw new EnemRateLimitError(
      response.headers.get("retry-after")
    );
  }

  if (!response.ok) {
    throw new Error(
      `Erro ao buscar questões do ENEM: ${response.status}`
    );
  }

  const data =
    (await response.json()) as EnemQuestionsResponse;

  setCachedEnemQuestions(cacheKey, data);

  return data;
}