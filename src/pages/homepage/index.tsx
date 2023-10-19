import Carta from '../../components/Carta';
import warrior from '../../assets/images/warrior-min.jpg';
import { useQuery } from 'react-query';
import api from '../../services/api';
import { CARTA } from '../../assets/types';
import styles from './Homepage.module.css';
import PageTemplate from '../../components/PageTemplate';
import { useReducer } from 'react';
import ModalDelete from '../../components/ModalDelete';
import { ACTION_CASES, INITIAL_STATE, MODAL_REDUCER, reducer } from './reducer';
import React from 'react';
import ModalInsert from '../../components/ModalInsert';
import ModalUpdate from '../../components/ModalUpdate';
import InputsCarta from '../../components/InputsCarta';

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
                  foto={warrior}
                  nome={item.nome}
                  ataque={item.ataque}
                  vida={item.vida}
                  custo_de_mana={item.custo_de_mana}
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
