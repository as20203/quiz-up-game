export interface QuizSchemaOutput {
  _id: string;
  score: number;
  categoryId: string;
  takenBy: string;
  adddedOn: string;
}

export type QuizQuery = {
  categoryId: string;
  takenBy: string;
};
