import Carta from '../../components/Carta';
import bota from '../../assets/images/botaHomemAranha.png';
import { useQuery } from 'react-query';
import api from '../../services/api';
import { CARTA } from '../../assets/types';
import styles from './Homepage.module.css';
// import { cartas } from '../../db/Cartas';
import PageTemplate from '../../components/PageTemplate';
import { useReducer, useState } from 'react';
import ModalDelete from '../../components/ModalDelete';
import {
  ACTION_CASES,
  INITIAL_STATE,
  MODAL_REDUCER,
  MODAL_REDUCER_TYPE,
  reducer,
} from './reducer';
import React from 'react';
import ModalInsert from '../../components/ModalInsert';
import ModalUpdate from '../../components/ModalUpdate';
import InputsCarta from './inputsCarta';

export default function Home() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleModalDelete = (body: any) => {
    dispatch({
      type: ACTION_CASES.MODAL,
      payload: {
        modal: MODAL_REDUCER.DELETE,
        value: { open: true, body: body },
      },
    });

    console.log('modal delete ' + state.modalDelete.body);
  };

  const handleChangeCarta = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ACTION_CASES.INPUT_CARTA,
      payload: {
        name: event.target.name,
        value: event.target.value,
      },
    });
  };

  const handleChangeCartaSelecionada = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: ACTION_CASES.INPUT_CARTA_SELECIONADA,
      payload: {
        name: event.target.name,
        value: event.target.value,
      },
    });
  };

  const selectCard = (card: CARTA) => {
    dispatch({
      type: ACTION_CASES.SELECTED_CARD,
      payload: card,
    });
  };

  const closeModal = async () => {
    await refetch(cartas);

    console.log('fechou homepage');
  };
  const getCartas = async () => {
    const data = await api.get('/cards');
    return data.data;
  };
  const {
    data: cartas,
    isLoading,
    refetch,
  } = useQuery<any>('cartas', getCartas);

  return (
    <PageTemplate title="CARTAS">
      <React.Fragment>
        <ModalInsert
          open={state.modalInsert.open}
          title={'Carta'}
          rota={'/createCard'}
          body={state.carta}
          onClose={closeModal}
        >
          <InputsCarta
            carta={state.carta}
            handleChange={handleChangeCarta}
          ></InputsCarta>
        </ModalInsert>
        <div className="flex-row ">
          {cartas &&
            cartas.map((item: CARTA) => (
              <div key={`carta-${item.id}`} className={styles.divCarta}>
                <Carta
                  foto={bota}
                  nome={item.nome}
                  ataque={item.ataque}
                  vida={item.vida}
                ></Carta>
                <ModalUpdate
                  title={'Carta'}
                  body={state.cartaSelecionada}
                  onOpen={() => selectCard(item)}
                  rota={`/updateCard/${item.id}`}
                  onClose={closeModal}
                >
                  <InputsCarta
                    carta={state.cartaSelecionada}
                    handleChange={handleChangeCartaSelecionada}
                  ></InputsCarta>
                </ModalUpdate>
                <ModalDelete
                  title={'Carta'}
                  body={item}
                  rota={`/deleteCard/${item.id}`}
                  onClose={closeModal}
                ></ModalDelete>
              </div>
            ))}
        </div>
      </React.Fragment>
    </PageTemplate>
  );
}
