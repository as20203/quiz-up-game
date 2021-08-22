export interface QuestionSchemaOutput {
  _id: string;
  text: string;
  choices: string[];
  answer: string;
  category: { name: string; _id: string };
  addedBy: string;
}
export type QuestionQuery = {
  addedBy: string;
  categoryId: string;
};
