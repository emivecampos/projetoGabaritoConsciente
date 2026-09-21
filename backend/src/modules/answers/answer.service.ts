import { createResult } from "../results/result.service";
import { getEnemQuestions } from "../questions/enem.service";

type AnswerInput = {
  year: number;
  questionIndex: number;
  alternative: string;
};

export async function checkAnswer({
  year,
  questionIndex,
  alternative,
}: AnswerInput) {
  const data = await getEnemQuestions(
    year,
    1,
    questionIndex
  );

  const question = data.questions[0];

  if (!question) {
    throw new Error("Questão não encontrada");
  }

  const selectedAlternative =
    alternative.trim().toUpperCase();

  const correct =
    question.correctAlternative ===
    selectedAlternative;

  const result = await createResult({
    year,
    discipline: question.discipline,
    questionIndex: question.index,
    selectedAlternative,
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