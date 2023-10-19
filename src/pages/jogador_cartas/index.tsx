import PageTemplate from '../../components/PageTemplate';
import React, { useReducer } from 'react';
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
import { CARTA, JOGADOR } from '../../assets/types';
import { useQuery } from 'react-query';
import InputsCarta from '../../components/InputsCarta';
import { ACTION_CASES, INITIAL_STATE, MODAL_REDUCER, reducer } from './reducer';
import ModalDelete from '../../components/ModalDelete';
import AutocompleteComponent from '../../components/Autocomplete';

export default function Jogador_Cartas() {
  const getCartas = async () => {
    const data = await api.get('/cards');
    return data.data;
  };
  const { data: cartas } = useQuery<any>('cartas', getCartas);

  const getJogadores = async () => {
    const data = await api.get('/players');
    return data.data;
  };
  const { data: jogadores } = useQuery<any>('jogadores', getJogadores);
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleModalDelete = (body: any) => {
    dispatch({
      type: ACTION_CASES.MODAL,
      payload: {
        modal: MODAL_REDUCER.DELETE,
        value: { open: true, body: body },
      },
    });
  };
  const closeModal = async () => {
    await refetch(jogador_carta);
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
                            <ModalDelete
                              title={'Carta'}
                              body={{ jogador_id: row.id, carta_id: carta.id }}
                              rota={`/removeCardFromPlayer/${row.id}/${carta.id}`}
                              onClose={closeModal}
                            ></ModalDelete>
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

  const handleChangeCarta = (carta: CARTA) => {
    dispatch({
      type: ACTION_CASES.SELECTED_CARD,
      payload: carta,
    });
  };

  const handleChangeJogador = (jogador: JOGADOR) => {
    dispatch({
      type: ACTION_CASES.SELECTED_JOGADOR,
      payload: jogador,
    });
  };

  return (
    <PageTemplate title="JOGADOR_CARTAS">
      <React.Fragment>
        <ModalInsert
          title={'Carta a um Jogador'}
          rota={'/addCardToPlayer'}
          body={{
            jogador_id: state.jogador.id,
            carta_id: state.cartaSelecionada.id,
          }}
          onClose={closeModal}
        >
          <AutocompleteComponent
            chave={1}
            renderOption={(props, option) => {
              return (
                <li {...props} key={`carta-${option.id}`}>
                  {option.nome}
                </li>
              );
            }}
            label={'Cartas'}
            set={handleChangeCarta}
            arrayData={cartas}
            getOptionLabel={option => option.nome}
          />
          <AutocompleteComponent
            chave={1}
            renderOption={(props, option) => {
              return (
                <li {...props} key={`carta-${option.id}`}>
                  {option.nome}
                </li>
              );
            }}
            label={'Jogadores'}
            set={handleChangeJogador}
            arrayData={jogadores}
            getOptionLabel={option => option.nome}
          />
        </ModalInsert>
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
