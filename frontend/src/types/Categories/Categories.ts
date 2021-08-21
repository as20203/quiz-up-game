export interface CategorySchemaOutput {
  _id: string;
  name: string;
  addedBy: string;
  addedOn: string;
}
export type ModalCategories = 'add' | 'edit' | 'delete' | '';
