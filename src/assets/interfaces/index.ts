import { CARTA, JOGADOR } from "../types";

export interface PageTemplateProps {
    title: string;
    children: JSX.Element | JSX.Element[];
}

export interface CartaProps{
    foto?: string | undefined;
    nome: string;
    ataque: number;
    vida: number;
  }


export interface MODAL_CRUD {
    open: boolean,
    body: any,
}

export  interface ModalProps {
    open?: boolean;
    title: string;
    rota: string;
    body?: any;
    children?: JSX.Element | JSX.Element[];
    onOpen?: () => void;
    onClose: () => void;
    onSubmit?: (data: any) => void;
  }

  export interface ReducerActions {
    type: any,
    payload: any
  }