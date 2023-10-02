import Carta from '../../components/Carta';
import bota from '../../assets/images/botaHomemAranha.png';
import { useQuery } from 'react-query';
import api from '../../services/api';
import { CARTA } from '../../assets/types';
import styles from './Homepage.module.css';
import { cartas } from '../../db/Cartas';
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ACTION_CASES.INPUT,
      payload: { name: event.target.name, value: event.target.value },
    });
  };

  const closeModal = (modal: string) => {
    // await refetch(cartas);
    dispatch({
      type: ACTION_CASES.MODAL,
      payload: { modal: modal, value: { open: false, body: null } },
    });
    console.log('fechou homepage');
  };
  // const getCartas = async () => {
  //   const data = await api.get('/cartas');
  //   return data.data;
  // };
  // const { data: cartas, isLoading, refetch } = useQuery<CARTA>('cartas', getCartas);
  return (
    <PageTemplate title="CARTAS">
      <React.Fragment>
        <ModalInsert
          title={'Carta'}
          rota={'/carta'}
          body={state.cartaInsert}
          onClose={() => closeModal(MODAL_REDUCER.INSERT)}
        >
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            name="nome"
            value={state.cartaInsert.nome}
            onChange={handleChange}
          ></input>
          <label htmlFor="ataque">Ataque</label>
          <input
            id="ataque"
            type="number"
            name="ataque"
            value={state.cartaInsert.ataque}
            onChange={handleChange}
          ></input>
          <label htmlFor="vida">Vida</label>
          <input
            id="vida"
            type="number"
            name="vida"
            placeholder="Vida"
            value={state.cartaInsert.vida}
            onChange={handleChange}
          ></input>
        </ModalInsert>
        {cartas.map((item: CARTA) => (
          <div key={`carta-${item.id}`} className={styles.divCarta}>
            <Carta
              foto={bota}
              nome={item.nome}
              ataque={item.ataque}
              vida={item.vida}
            ></Carta>
            <button
              className="standardbutton"
              onClick={() => handleModalDelete(item)}
            >
              Deletar
            </button>
          </div>
        ))}
        <ModalDelete
          title={'Deletar carta'}
          rota={'/deleteCard'}
          open={state.modalDelete.open}
          body={state.modalDelete.body}
          onClose={() => closeModal(MODAL_REDUCER.DELETE)}
        ></ModalDelete>
      </React.Fragment>
    </PageTemplate>
  );
}
