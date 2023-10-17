import React from 'react';
import { JOGADOR } from '../../assets/types';

interface InputsJogador {
  jogador: JOGADOR;
  id: number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputsJogador({
  jogador,
  id,
  handleChange,
}: InputsJogador) {
  return (
    <React.Fragment>
      <label htmlFor="nome">Nome</label>
      <input
        // id="nome"
        type="text"
        name="nome"
        value={jogador.nome}
        onChange={handleChange}
      ></input>
      <label htmlFor="email">E-mail</label>
      <input
        // id="email"
        type="string"
        name="email"
        value={jogador.email}
        onChange={handleChange}
      ></input>
      <label htmlFor="senha">Senha</label>
      <input
        // id="senha"
        type="password"
        name="senha"
        value={jogador.senha}
        onChange={handleChange}
      ></input>
    </React.Fragment>
  );
}
