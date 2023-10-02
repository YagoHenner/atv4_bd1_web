import React from 'react';
import { CARTA } from '../../assets/types';

interface InputsCarta {
  carta: CARTA;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputsCarta({ carta, handleChange }: InputsCarta) {
  return (
    <React.Fragment>
      <label htmlFor="nome">Nome</label>
      <input
        id="nome"
        type="text"
        name="nome"
        value={carta.nome}
        onChange={handleChange}
      ></input>
      <label htmlFor="ataque">Ataque</label>
      <input
        id="ataque"
        type="number"
        name="ataque"
        value={carta.ataque}
        onChange={handleChange}
      ></input>
      <label htmlFor="vida">Vida</label>
      <input
        id="vida"
        type="number"
        name="vida"
        placeholder="Vida"
        value={carta.vida}
        onChange={handleChange}
      ></input>
    </React.Fragment>
  );
}
