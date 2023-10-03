import React from 'react';
import { CARTA, JOGADOR } from '../../assets/types';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ModalUpdate from '../../components/ModalUpdate';

export const columns = [
  {
    id: 'nome',
    label: 'NOME',
  },
  {
    id: 'email',
    label: 'E-MAIL',
  },
  {
    id: 'pontuacao',
    label: 'XP',
  },
  {
    id: 'ranking_id',
    label: 'RANKING',
  },
];

export function Listagem(props: { row: JOGADOR; onClose: () => void }) {
  const { row } = props;
  const onClose = props.onClose;
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableRow key={`${row.id}`}>
        <TableCell align="center" component="th" scope="row">
          {row.nome}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.email}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.pontuacao}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.ranking_id}
        </TableCell>
        <TableCell align="center">
          <ModalUpdate
            title={'Jogador'}
            rota={'/updatePlayer'}
            onClose={onClose}
          ></ModalUpdate>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h5" gutterBottom component="div">
                  Cartas
                </Typography>
                <Table size="small" aria-label="Atletas">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Nome</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.cartas &&
                      row.cartas.map((carta) => (
                        <TableRow key={`${carta.nome}-${carta.id}-${row.id}`}>
                          <TableCell>{carta.nome}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableCell>
      </TableRow>
    </>
  );
}
