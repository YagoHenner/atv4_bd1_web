import { MODAL_CRUD, ReducerActions } from '../../assets/interfaces';
import { CARTA, JOGADOR } from '../../assets/types';

export interface INITIAL_STATE_TYPE {
  modalDelete: MODAL_CRUD;
  modalInsert: MODAL_CRUD;
  jogador: JOGADOR;
  jogadorSelecionado: JOGADOR;
}

const MODAL_INITIAL = {
  open: false,
  body: null,
};

export const INITIAL_STATE: INITIAL_STATE_TYPE = {
  modalDelete: MODAL_INITIAL,
  modalInsert: MODAL_INITIAL,
  jogador: {
    id: 0,
    nome: '',
    email: '',
  },
  jogadorSelecionado: {
    id: 0,
    nome: '',
    email: '',
  },
};

export interface MODAL_REDUCER_TYPE {
  DELETE: string;
  INSERT: string;
}

export const MODAL_REDUCER: MODAL_REDUCER_TYPE = {
  DELETE: 'modalDelete',
  INSERT: 'modalInsert',
};

export const ACTION_CASES = {
  MODAL: '0',
  CLOSE_MODAL: '1',
  JOGADOR: '2',
  INPUT_JOGADOR: '3',
  SELECTED_JOGADOR: '4',
  INPUT_SELECTED_JOGADOR: '5',
};

export const reducer = (state: INITIAL_STATE_TYPE, action: ReducerActions) => {
  switch (action.type) {
    case ACTION_CASES.MODAL:
      return {
        ...state,
        [action.payload.modal]: action.payload.value,
      };

    case ACTION_CASES.CLOSE_MODAL:
      return {
        ...state,
        [action.payload.modal]: MODAL_INITIAL,
      };
    case ACTION_CASES.JOGADOR:
      return {
        ...state,
        jogador: action.payload,
      };

    case ACTION_CASES.INPUT_JOGADOR:
      return {
        ...state,
        jogador: {
          ...state.jogador,
          [action.payload.name]: action.payload.value,
        },
      };
    case ACTION_CASES.SELECTED_JOGADOR:
      return {
        ...state,
        jogadorSelecionado: action.payload,
      };
    case ACTION_CASES.INPUT_SELECTED_JOGADOR:
      return {
        ...state,
        jogadorSelecionado: {
          ...state.jogadorSelecionado,
          [action.payload.name]: action.payload.value,
        },
      };
    default:
      return state;
  }
};
