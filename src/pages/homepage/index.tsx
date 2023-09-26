import Carta from '../../components/Carta';
import bota from '../../assets/images/botaHomemAranha.png';

export default function Home() {
  return (
    <Carta foto={bota} nome={'O tênis Homaranha'} ataque={16} vida={9}></Carta>
  );
}
