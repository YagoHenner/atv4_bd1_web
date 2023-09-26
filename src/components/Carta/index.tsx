import { Heart, Sword } from '@phosphor-icons/react';
import styles from './Carta.module.css';

export default function Carta({
  foto,
  nome,
  ataque,
  vida,
}: {
  foto: string | undefined;
  nome: string;
  ataque: number;
  vida: number;
}) {
  return (
    <div className={styles.container}>
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
