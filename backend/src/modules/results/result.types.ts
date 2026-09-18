export type Result = {
  id: string;
  year: number;
  discipline: string;
  questionIndex: number;
  selectedAlternative: string;
  correctAlternative: string;
  correct: boolean;
  answeredAt: Date;
};