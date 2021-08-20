import {
  Table as MUITalbe,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';

interface Headrow {
  value: string;
}
interface RowData {
  value: string;
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify';
}
interface BodyRow {
  _id: string;
  rowData: RowData[];
}
interface TableProps {
  tableHeadRow: Headrow[];
  tableBodyRow: BodyRow[];
}
export const Table = ({ tableHeadRow, tableBodyRow }: TableProps) => {
  return (
    <TableContainer component={Paper}>
      <MUITalbe>
        <TableHead>
          <TableRow>
            {tableHeadRow.map(({ value }) => (
              <TableCell>{value}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBodyRow.map(({ rowData, _id }) => (
            <TableRow key={_id}>
              {rowData.map(({ value, align }) => (
                <TableCell align={align}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MUITalbe>
    </TableContainer>
  );
};
