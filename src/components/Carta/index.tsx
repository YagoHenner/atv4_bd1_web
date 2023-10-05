import { Heart, Sword, Drop } from '@phosphor-icons/react';
import styles from './Carta.module.css';
import { CartaProps } from '../../assets/interfaces';

export default function Carta({
  foto,
  nome,
  ataque,
  vida,
  custo_de_mana,
}: CartaProps) {
  return (
    <div className={styles.container}>
      <div className={styles.mana}>
        <div className={styles.stat}>{custo_de_mana}</div>
        <Drop size={52} color="#237bcd" weight="fill" />
      </div>
      <div className={styles.fotoDIV}>
        <img
          className={styles.foto}
          alt={`${nome}`}
          width={200}
          src={foto}
        ></img>
      </div>
      <div className={styles.nome}>{nome.toUpperCase()}</div>
      <div className={styles.campoTextos}>
        <div className={styles.ataque}>
          <div className={styles.stat}>{ataque}</div>
          <Sword size={100} color="#f0a92d" weight="fill" />
        </div>
        <div className={styles.vida}>
          <div className={styles.stat}>{vida}</div>
          <Heart size={100} color="#c21e1e" weight="fill" />
        </div>
      </div>
    </div>
  );
}
