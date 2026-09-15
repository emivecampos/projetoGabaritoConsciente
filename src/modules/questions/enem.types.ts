export type EnemAlternative = {
    letter: string;
    text: string;
    file: string | null;
    isCorrect: boolean;
}

export type EnemQuestion = {
    title: string;
    index: number;
    discipline: string;
    language: string | null;
    year: number;
    context: string | null;
    files: string[];
    correctAlternative: string
    alternativesIntroduction: string;
    alternatives: EnemAlternative[];
}

export type EnemQuestionsMetadata = {
    limit: number;
    offset: number;
    total: number;
    hasMore: boolean;
}

export type EnemQuestionsResponse = {
    questions: EnemQuestion[];
    metadata: EnemQuestionsMetadata;
}