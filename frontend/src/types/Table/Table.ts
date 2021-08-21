export interface Headrow {
  value: string;
}
interface RowData {
  value: string;
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify';
}
export interface BodyRow {
  _id: string;
  rowData: RowData[];
  includeActions?: boolean;
}
