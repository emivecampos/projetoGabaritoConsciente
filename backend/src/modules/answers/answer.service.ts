import { createResult } from "../results/result.service";
import { getEnemQuestions } from "../questions/enem.service";

type AnswerInput = {
  year: number;
  offset: number;
  alternative: string;
};

export class QuestionNotFoundError extends Error {
  constructor() {
    super("Questão não encontrada");
    this.name = "QuestionNotFoundError";
  }
}

export async function checkAnswer({
  year,
  offset,
  alternative,
}: AnswerInput) {
  const data = await getEnemQuestions(
    year,
    1,
    offset
  );

  const question = data.questions[0];

  if (!question) {
    throw new QuestionNotFoundError();
  }

  const correct =
    question.correctAlternative === alternative;

  const result = await createResult({
    year,
    discipline: question.discipline,
    questionIndex: question.index,
    selectedAlternative: alternative,
    correctAlternative:
      question.correctAlternative,
    correct,
  });

  return {
    correct,
    correctAlternative:
      question.correctAlternative,
    questionIndex: question.index,
    discipline: question.discipline,
    resultId: result.id,
  };
}