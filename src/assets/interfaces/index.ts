export interface PageTemplateProps {
    title?: string;
    children: JSX.Element | JSX.Element[];
}

export interface CartaProps{
    foto?: string | undefined;
    nome: string;
    ataque: number;
    vida: number;
  }

export interface CrudProps {
    rotaInsert: string;
    rotaDelete: string;
    rotaUpdate: string;
    rotaRead: string;
    bodyInsert: any;
    bodyDelete: any;
    bodyUpdate: any;
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
    onClose: () => void;
    onSubmit?: (data: any) => void;
  }

  export interface ReducerActions {
    type: any,
    payload: any
  }