import PageTemplate from '../../components/PageTemplate';
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
import ModalInsert from '../../components/ModalInsert';
import TableMinimizavel from '../../components/TableMinimizavel';
import { columns } from './tabelaUtils';
import api from '../../services/api';
import { useQuery } from 'react-query';

export default function Jogadores() {
  const getJogadores = async () => {
    const data = await api.get('/players');
    return data.data;
  };
  const {
    data: jogadores,
    isLoading,
    refetch,
  } = useQuery<any>('cartas', getJogadores);
  const closeModal = async () => {
    await refetch(jogadores);
    console.log('fechou homepage');
  };

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
              onClose={closeModal}
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
                        row.cartas.map(carta => (
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

  return (
    <PageTemplate title="JOGADORES">
      <React.Fragment>
        <ModalInsert
          title={'Jogador'}
          rota={'/addPlayer'}
          //   body={state.carta}
          onClose={closeModal}
        />
        {isLoading ? (
          <span>Carregando</span>
        ) : (
          <TableMinimizavel
            columns={columns}
            rows={jogadores}
            Function={Listagem}
            inicialSort={'nome'}
          ></TableMinimizavel>
        )}
      </React.Fragment>
    </PageTemplate>
  );
}
