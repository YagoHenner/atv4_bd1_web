import { useRef } from 'react';
import { ModalProps } from '../../assets/interfaces';
import api from '../../services/api';
import React from 'react';

export default function ModalDelete({
  open,
  rota,
  title,
  body,
  children,
  onClose,
  onSubmit,
}: ModalProps) {
  const refDelete = useRef<HTMLDialogElement>(null);

  const handleOpen = () => {
    if (refDelete.current) {
      refDelete.current.showModal();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await api.delete(rota);
    onClose();
  };

  const handleClose = () => {
    if (refDelete.current) {
      refDelete.current.close();
      onClose();
    }
  };

  return (
    <React.Fragment>
      <button className="standardbutton" onClick={handleOpen}>
        Deletar
      </button>
      <dialog ref={refDelete}>
        <h2>{title}</h2>
        <p>Tem certeza de que deseja deletar estes dados:</p>
        {JSON.stringify(body)}
        <form onSubmit={handleSubmit}>
          <button
            className="invertedbutton"
            formMethod="dialog"
            type="button"
            onClick={handleClose}
          >
            Cancelar
          </button>

          <button className="invertedbutton" type="submit">
            Deletar
          </button>
        </form>
      </dialog>
    </React.Fragment>
  );
}
