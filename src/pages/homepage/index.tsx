import Carta from '../../components/Carta';
import bota from '../../assets/images/botaHomemAranha.png';
import { useQuery } from 'react-query';
import api from '../../services/api';
import { CARTA } from '../../assets/types';
import { cartas } from '../../db/Cartas';
import PageTemplate from '../../components/PageTemplate';

export default function Home() {
  // const getCartas = async () => {
  //   const data = await api.get('/cartas');
  //   return data.data;
  // };
  // const { data: cartas, isLoading } = useQuery<CARTA>('cartas', getCartas);
  return (
    <PageTemplate title="CARTAS">
      {cartas.map((item: CARTA) => (
        <Carta
          key={`carta-${item.id}`}
          foto={bota}
          nome={item.nome}
          ataque={item.ataque}
          vida={item.vida}
        ></Carta>
      ))}
    </PageTemplate>
  );
}
