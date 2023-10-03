import React from 'react';
import { Link } from 'react-router-dom';

export default function BotoesGuia() {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Link to={'/'}>
        <button className="standardbutton" type="button">
          Cartas
        </button>
      </Link>
      <Link to={'/jogadores'}>
        <button className="standardbutton" type="button">
          Jogadores
        </button>
      </Link>
      <Link to={'/jogador_cartas'}>
        <button className="standardbutton" type="button">
          Jogador-Cartas
        </button>
      </Link>
    </div>
  );
}
