import PageTemplate from '../../components/PageTemplate';
import React from 'react';
import ModalInsert from '../../components/ModalInsert';
import TableMinimizavel from '../../components/TableMinimizavel';
import { columns, Listagem } from './tabelaUtils';
import { jogadores as jogador_cartas } from '../../db/Jogadores';

export default function Jogador_Cartas() {
  const closeModal = () => {
    // await refetch(cartas);
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
          title={'Carta a um Jogador'}
          rota={'/addPlayer'}
          //   body={state.carta}
          onClose={closeModal}
        />
        <TableMinimizavel
          columns={columns}
          rows={jogador_cartas}
          Function={Listagem}
          inicialSort={'nome'}
        ></TableMinimizavel>
      </React.Fragment>
    </PageTemplate>
  );
}
