import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './TableMinimizavel.module.css';
import { useState } from 'react';
import { TablePagination, TableSortLabel } from '@mui/material';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export default function TableMinimizavel({
  columns,
  rows,
  actionsPosition,
  Function,
  inicialSort,
  inicialOrder,
}: {
  columns: any[];
  rows: any[];
  actionsPosition?: String;
  Function: (key: any, row: any) => any;
  inicialSort: String;
  inicialOrder?: Order;
}) {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = React.useState<keyof any>(`${inicialSort}`);
  const [order, setOrder] = React.useState<Order>(inicialOrder ?? 'asc');
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  const createSortHandler =
    (property: keyof any) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof any
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleMinPageLength = () => {
    if (rows.length <= rowsPerPage) {
      setPage(0);
    }
  };

  const handleRowsPerPageChange = (event: any) => {
    const change = parseInt(event.target.value, 10);
    if (rows.length >= change) {
      setRowsPerPage(change);
    }
  };

  React.useEffect(() => {
    handleMinPageLength();
  }, [rows, rowsPerPage]);

  return (
    <Paper className={styles.table}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {actionsPosition == 'left' && (
                <TableCell align="center">AÇÕES</TableCell>
              )}
              {columns.map((column: any) => (
                <TableCell
                  key={column.label}
                  align="center"
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              {actionsPosition == 'right' && (
                <TableCell align="center">AÇÕES</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows */}
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Function key={row.id} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[
          10,
          25,
          50,
          { value: rows.length, label: 'Todos' },
        ]}
        onRowsPerPageChange={(event: any) => handleRowsPerPageChange(event)}
        labelRowsPerPage={'Itens:'}
      />
    </Paper>
  );
}
