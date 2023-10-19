import { useRef, useState } from 'react';
import { ModalProps } from '../../assets/interfaces';
import api from '../../services/api';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function ModalInsert({
  rota,
  title,
  children,
  body,
  onClose,
  onSubmit,
}: ModalProps) {
  const refInsert = useRef<HTMLDialogElement>(null);

  const handleOpen = () => {
    if (refInsert.current) {
      refInsert.current.showModal();
    }
  };
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await api.post(rota, body);
    if (refInsert.current) {
      refInsert.current.close();
      onClose();
    }
  };

  const handleClose = () => {
    if (refInsert.current) {
      refInsert.current.close();
      onClose();
    }
  };

  return (
    <React.Fragment>
      <button className="standardbutton" onClick={handleOpen}>
        Inserir
      </button>
      <dialog ref={refInsert} style={{ overflow: 'visible' }}>
        <h2>Inserir {title}</h2>
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
            Inserir
          </button>
        </form>
      </dialog>
    </React.Fragment>
  );
}
