import PageTemplate from '../../components/PageTemplate';
import React from 'react';
import ModalInsert from '../../components/ModalInsert';

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
          //   open={state.modalInsert.open}
          title={'Jogador'}
          rota={'/addPlayer'}
          //   body={state.carta}
          onClose={closeModal}
        />
      </React.Fragment>
    </PageTemplate>
  );
}
