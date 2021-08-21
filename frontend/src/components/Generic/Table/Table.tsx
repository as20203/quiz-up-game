import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import { ActionsMenu } from 'components';
import { Headrow, BodyRow } from 'types';
interface TableProps {
  tableHeadRows: Headrow[];
  tableBodyRows: BodyRow[];
}
export const Table = ({ tableHeadRows, tableBodyRows }: TableProps) => {
  return (
    <TableContainer style={{ width: '80%' }} component={Paper}>
      <MUITable>
        <TableHead>
          <TableRow>
            {tableHeadRows.map(({ value }) => (
              <TableCell style={{ fontWeight: 'bold' }}>{value}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBodyRows.map(({ rowData, _id }) => (
            <TableRow key={_id}>
              {rowData.map(({ align, value }) => (
                <>
                  {value !== 'actions' ? (
                    <TableCell align={align}>{value}</TableCell>
                  ) : (
                    <TableCell align={align}>
                      <ActionsMenu />
                    </TableCell>
                  )}
                </>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};
