export interface QuestionSchemaOutput {
  _id: string;
  text: string;
  choices: string[];
  answer: string;
  categoryId: string;
  addedBy: string;
}
