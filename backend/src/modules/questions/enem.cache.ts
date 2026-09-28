import type { EnemQuestionsResponse } from "./enem.types";

type CacheEntry = {
  data: EnemQuestionsResponse;
  expiresAt: number;
};

const cache = new Map<string, CacheEntry>();

const CACHE_TTL_MS = 1000 * 60 * 10; // 10 minutos

export function getCachedEnemQuestions(
  key: string
): EnemQuestionsResponse | null {
  const entry = cache.get(key);

  if (!entry) {
    return null;
  }

  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

export function setCachedEnemQuestions(
  key: string,
  data: EnemQuestionsResponse
) {
  cache.set(key, {
    data,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}