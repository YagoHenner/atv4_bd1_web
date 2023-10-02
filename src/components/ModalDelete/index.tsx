import { useRef } from 'react';
import { ModalProps } from '../../assets/interfaces';
import api from '../../services/api';

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

  if (open) {
    console.log('show delete');
    refDelete?.current?.showModal();
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await api.delete(rota, body);
    onClose();
  };

  const handleClose = () => {
    if (refDelete.current) {
      refDelete.current.close();
      onClose();
    }
  };

  return (
    <dialog open={open} ref={refDelete}>
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
  );
}
