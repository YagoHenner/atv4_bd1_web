import PageTemplate from '../../components/PageTemplate';
import React from 'react';
import ModalInsert from '../../components/ModalInsert';
import TableMinimizavel from '../../components/TableMinimizavel';
import { columns } from './tabelaUtils';

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
import api from '../../services/api';
import { JOGADOR } from '../../assets/types';
import { useQuery } from 'react-query';

export default function Jogador_Cartas() {
  const closeModal = async () => {
    await refetch(jogador_carta);
    console.log('fechou homepage');
  };
  const getJogador_Carta = async () => {
    const data = await api.get('/playersWithCards');
    return data.data;
  };
  const {
    data: jogador_carta,
    isLoading,
    refetch,
  } = useQuery<any>('jogador_carta', getJogador_Carta);

  function Listagem(props: { row: JOGADOR }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <TableRow key={`${row.id}`}>
          <TableCell align="center" component="th" scope="row">
            {row.nome}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
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
                        <TableCell>
                          <b>Descrição</b>
                        </TableCell>
                        <TableCell>
                          <b>Ataque</b>
                        </TableCell>
                        <TableCell>
                          <b>Vida</b>
                        </TableCell>
                        <TableCell>
                          <b>Custo de Mana</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.cartas &&
                        row.cartas.map(carta => (
                          <TableRow key={`${carta.nome}-${carta.id}-${row.id}`}>
                            <TableCell>{carta.nome}</TableCell>
                            <TableCell>{carta.descricao}</TableCell>
                            <TableCell>{carta.ataque}</TableCell>
                            <TableCell>{carta.vida}</TableCell>
                            <TableCell>{carta.custo_de_mana}</TableCell>
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

  return (
    <PageTemplate title="CARTAS">
      <React.Fragment>
        <ModalInsert
          title={'Carta a um Jogador'}
          rota={'/addPlayer'}
          //   body={state.carta}
          onClose={closeModal}
        />
        {jogador_carta && (
          <TableMinimizavel
            columns={columns}
            rows={jogador_carta}
            Function={Listagem}
            inicialSort={'nome'}
          ></TableMinimizavel>
        )}
      </React.Fragment>
    </PageTemplate>
  );
}
