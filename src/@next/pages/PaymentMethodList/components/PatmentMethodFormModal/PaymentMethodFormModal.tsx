import React, { FC, useRef, useState } from "react";
import { Modal } from "@components/organisms";
import { IPaymentMethodFormModalProps } from "./types";
import { NiubizForm } from "../NiubizForm";
import { ICardTokenizationResult } from "@temp/core/payments/niubiz";

export const PatmentMethodFormModal: FC<IPaymentMethodFormModalProps> = ({
  show,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // TODO: unificar con checkout
  const generatePurchaseNumber = (): number => {
    const payload: any = {
      purchase_number: Math.floor(Math.random() * (999999999999 - 1)) + 1,
    };

    return payload.purchase_number;
  };

  const performSubmit = () => {
    if (loading) {
      return;
    }

    if (formRef.current) {
      setLoading(true);
      formRef.current?.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  };

  const handleCardTokenization = (data: ICardTokenizationResult) => {
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
  };

  return (
    <Modal
      title="Guardar nueva tarjeta"
      show={show}
      hide={onClose}
      submitBtnText="Guardar"
      onSubmit={performSubmit}
      disabled={loading}
    >
      {loading && <h1>LOADING</h1>}
      {show && (
        <NiubizForm
          generatePurchaseNumber={generatePurchaseNumber}
          userDataForNiubiz={{
            documentNumber: "71073040",
            email: "umelendez@auna.pe",
          }}
          formRef={formRef}
          onCardTokenization={handleCardTokenization}
          onError={onError}
        />
      )}
    </Modal>
  );
};
