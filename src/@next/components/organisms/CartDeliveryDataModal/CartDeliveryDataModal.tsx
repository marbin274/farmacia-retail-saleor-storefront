import React from "react";
import { Modal } from "../Modal";
import { IProps } from "./types";
import { CartDeliveryData } from  "@components/organisms";

export const CartDeliveryDataModal: React.FC<IProps> = ({
  hideModal,
  target,
  title,
  formId,
  checkout,
}: IProps) => {
  const [show, setShow] = React.useState(true);


  return (
    <Modal
      title={title}
      hide={() => {
        hideModal();
        setShow(false);
      }}
      submitBtnText=""
      formId={formId}
      disabled={false}
      show={show}
      target={target}
    >
      <CartDeliveryData checkout={checkout} />
    </Modal>
  );
};
