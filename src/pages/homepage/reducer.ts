import { MODAL_CRUD, ReducerActions } from '../../assets/interfaces';
import { CARTA } from '../../assets/types';

export interface INITIAL_STATE_TYPE {
  carta: CARTA;
  modalDelete: MODAL_CRUD;
  modalInsert: MODAL_CRUD;
  cartaSelecionada: CARTA;
}

const MODAL_INITIAL = {
  open: false,
  body: null,
};

export const INITIAL_STATE: INITIAL_STATE_TYPE = {
  modalDelete: MODAL_INITIAL,
  modalInsert: MODAL_INITIAL,
  carta: {
    nome: '',
    ataque: 0,
    vida: 0,
    custo_de_mana: 0,
  },
  cartaSelecionada: {
    nome: '',
    ataque: 0,
    vida: 0,
    custo_de_mana: 0,
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
  INPUT_CARTA: '2',
  INPUT_CARTA_SELECIONADA: '3',
  SELECTED_CARD: '4',
};

export const reducer = (
  state: INITIAL_STATE_TYPE,
  action: ReducerActions
): INITIAL_STATE_TYPE => {
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
    case ACTION_CASES.INPUT_CARTA:
      return {
        ...state,
        carta: {
          ...state.carta,
          [action.payload.name]: action.payload.value,
        },
      };
    case ACTION_CASES.INPUT_CARTA_SELECIONADA:
      return {
        ...state,
        cartaSelecionada: {
          ...state.cartaSelecionada,
          [action.payload.name]: action.payload.value,
        },
      };
    case ACTION_CASES.SELECTED_CARD:
      return {
        ...state,
        cartaSelecionada: action.payload,
      };
    default:
      return state;
  }
};
