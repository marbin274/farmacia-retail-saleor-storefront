import * as React from "react";
import ReactSVG from "react-svg";
import { Button } from "../..";
import closeImg from "../../../images/simple-close.svg";

interface IProps {
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const DeleteModal: React.FC<IProps> = ({ onConfirm, onCancel, onClose }) => (
  <div className="cart__delete-modal">
    <ReactSVG
      path={closeImg}
      className="cart__delete-modal__close"
      onClick={onClose}
    />
    <p className="cart__delete-modal__wording">
      ¿Estás seguro que quieres eliminar este producto?
    </p>
    <Button className="cart__delete-modal__button--primary" onClick={onConfirm}>
      Sí
    </Button>
    <Button
      className="cart__delete-modal__button--secondary"
      onClick={onCancel}
    >
      Cancelar
    </Button>
  </div>
);

export default DeleteModal;
