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
  const data = await getEnemQuestions(year, 1, questionIndex);

  const question = data.questions[0];

  if (!question) {
    throw new Error("Questão não encontrada");
  }

  const normalizedAlternative = alternative.toUpperCase();

  const isCorrect =
    question.correctAlternative === normalizedAlternative;

  return {
    correct: isCorrect,
    correctAlternative: question.correctAlternative,
    questionIndex: question.index,
  };
}