import { useRef, useState } from 'react';
import { ModalProps } from '../../assets/interfaces';
import api from '../../services/api';
import React from 'react';
import { useForm } from 'react-hook-form';

interface ModalGenProps {
  title: string;
  forwardedRef: React.RefObject<HTMLDialogElement>;
  submit: () => Promise<void>;
  children?: JSX.Element | JSX.Element[];
}

export default function ModalFormGeneral({
  title,
  forwardedRef,
  submit,
  children,
}: ModalGenProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit();
    handleClose();
  };

  const handleClose = () => {
    if (forwardedRef.current) {
      forwardedRef.current.close();
    }
  };

  return (
    <React.Fragment>
      <dialog ref={forwardedRef}>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
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
