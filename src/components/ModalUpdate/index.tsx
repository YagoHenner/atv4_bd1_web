import { useRef, useState } from 'react';
import { ModalProps } from '../../assets/interfaces';
import api from '../../services/api';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function ModalUpdate({
  rota,
  title,
  children,
  body,
  onClose,
  onSubmit,
}: ModalProps) {
  const refUpdate = useRef<HTMLDialogElement>(null);

  const handleOpen = () => {
    console.log('shoveit');
    if (refUpdate.current) {
      refUpdate.current.showModal();
    }
  };
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const response = await api.post(rota, body);
    console.log(body);
    console.log('submit');
    if (refUpdate.current) {
      refUpdate.current.close();
      onClose();
    }
  };

  const handleClose = () => {
    if (refUpdate.current) {
      refUpdate.current.close();
      onClose();
    }
  };

  return (
    <React.Fragment>
      <button className="standardbutton" onClick={handleOpen}>
        Alterar
      </button>
      <dialog ref={refUpdate}>
        <h2>Atualizar {title}</h2>
        <form onSubmit={submit}>
          {children}
          <button
            className="invertedbutton"
            type="button"
            formMethod="dialog"
            onClick={handleClose}
          >
            Cancelar
          </button>

          <button className="invertedbutton" type="submit">
            Atualizar
          </button>
        </form>
      </dialog>
    </React.Fragment>
  );
}