import PageTemplate from '../../components/PageTemplate';
import React from 'react';
import ModalInsert from '../../components/ModalInsert';
import TableMinimizavel from '../../components/TableMinimizavel';
import { Listagem, columns } from './tabelaUtils';
import { jogadores } from '../../db/Jogadores';

export default function Jogadores() {
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
          title={'Jogador'}
          rota={'/addPlayer'}
          //   body={state.carta}
          onClose={closeModal}
        />
        <TableMinimizavel
          columns={columns}
          rows={jogadores}
          Function={Listagem}
          inicialSort={'nome'}
        ></TableMinimizavel>
      </React.Fragment>
    </PageTemplate>
  );
}
