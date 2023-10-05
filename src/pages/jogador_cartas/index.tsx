import PageTemplate from '../../components/PageTemplate';
import React from 'react';
import ModalInsert from '../../components/ModalInsert';
import TableMinimizavel from '../../components/TableMinimizavel';
import { columns, Listagem } from './tabelaUtils';
import { jogadores as jogador_cartas } from '../../db/Jogadores';
import api from '../../services/api';
import { JOGADOR, JOGADOR_CARTAS } from '../../assets/types';
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
