import PageTemplate from '../../components/PageTemplate';
import React, { useReducer, useRef } from 'react';
import { CARTA, JOGADOR } from '../../assets/types';
import {
  Box,
  Collapse,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
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
import InputsJogador from '../../components/InputsJogadores';
import { ACTION_CASES, INITIAL_STATE, reducer } from './reducer';
import ModalDelete from '../../components/ModalDelete';
import ModalFormGeneral from '../../components/ModalFormGeneral';

export default function Jogadores() {
  const getJogadores = async () => {
    const data = await api.get('/players');
    return data.data;
  };
  const {
    data: jogadores,
    isLoading,
    refetch,
  } = useQuery<any>('jogadores', getJogadores);
  const closeModal = async () => {
    await refetch(jogadores);
    console.log('fechou homepage');
  };

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const refUpdate = useRef<HTMLDialogElement>(null);

  const handleChangePlayer = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ACTION_CASES.INPUT_JOGADOR,
      payload: {
        name: event.target.name,
        value: event.target.value,
      },
    });
  };

  const handleChangeSelectedPlayer = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: ACTION_CASES.INPUT_SELECTED_JOGADOR,
      payload: {
        name: event.target.name,
        value: event.target.value,
      },
    });
  };

  const handleUpdatePlayer = async () => {
    try {
      const response = await api.put(
        `/updatePlayer/${state.jogadorSelecionado.id}`,
        state.jogadorSelecionado
      );
      console.log('submit');
      await refetch(jogadores);
    } catch (error) {
      alert(error);
    }
  };

  function selectPlayer(jogador: JOGADOR) {
    dispatch({
      type: ACTION_CASES.SELECTED_JOGADOR,
      payload: jogador,
    });
    refUpdate?.current?.showModal();
  }

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
            <TableBody>
              <ModalDelete
                title={'Deletar Jogador'}
                rota={`/deletePlayer/${row.id}`}
                body={row}
                onClose={closeModal}
              ></ModalDelete>
              <button
                className="standardbutton"
                onClick={() => selectPlayer(row)}
              >
                Alterar
              </button>
            </TableBody>
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
        <button onClick={() => console.log(state.jogadorSelecionado)}>
          selecionado
        </button>
        <ModalFormGeneral
          title={'Atualizar Jogador'}
          forwardedRef={refUpdate}
          submit={handleUpdatePlayer}
        >
          <InputsJogador
            id={0}
            jogador={state.jogadorSelecionado}
            handleChange={handleChangeSelectedPlayer}
          ></InputsJogador>
        </ModalFormGeneral>

        <ModalInsert
          title={'Jogador'}
          rota={'/createPlayer'}
          body={state.jogador}
          onClose={closeModal}
        >
          <InputsJogador
            jogador={state.jogador}
            id={1}
            handleChange={handleChangePlayer}
          ></InputsJogador>
        </ModalInsert>
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
