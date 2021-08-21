import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination
} from '@material-ui/core';
import { ActionsMenu } from 'components';
import { Headrow, BodyRow, TableSetState, ModalCategories } from 'types';
import { TablePaginationActions } from './Pagination';
import { MouseEvent, useState } from 'react';
interface TableProps {
  tableHeadRows: Headrow[];
  tableBodyRows: BodyRow[];
  setOpenModal: TableSetState<boolean>;
  setModalCategory: TableSetState<ModalCategories>;
  setSelectedElementId: TableSetState<string>;
}
export const Table = ({
  tableHeadRows,
  tableBodyRows,
  setOpenModal,
  setModalCategory,
  setSelectedElementId
}: TableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper}>
      <MUITable>
        <TableHead>
          <TableRow>
            {tableHeadRows.map(({ value }) => (
              <TableCell style={{ fontWeight: 'bold' }}>{value}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? tableBodyRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : tableBodyRows
          ).map(({ rowData, _id }) => (
            <TableRow key={_id}>
              {rowData.map(({ align, value }) => (
                <>
                  {value !== 'actions' ? (
                    <TableCell align={align}>{value}</TableCell>
                  ) : (
                    <TableCell align={align}>
                      <ActionsMenu
                        id={_id}
                        setSelectedElementId={setSelectedElementId}
                        setOpenModal={setOpenModal}
                        setModalCategory={setModalCategory}
                      />
                    </TableCell>
                  )}
                </>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={tableBodyRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MUITable>
    </TableContainer>
  );
};
