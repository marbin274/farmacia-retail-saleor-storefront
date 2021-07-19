import React, { FC, useState } from "react";
import { Modal } from "@components/organisms";
import { PROVIDERS } from "@temp/core/config";
import { useCheckout } from "@sdk/react";
import { IPaymentMethodFormModalProps } from "./types";
import { NiubizForm } from "../NiubizForm";

export const PatmentMethodFormModal: FC<IPaymentMethodFormModalProps> = ({
  formRef,
  show,
  onClose,
  onSubmit,
  user,
  loading: createLoading,
}) => {
  const [loading, setLoading] = useState(false);
  const isLoading = loading || createLoading;

  const { availablePaymentGateways } = useCheckout();

  // TODO: unificar con checkout
  const generatePurchaseNumber = (): number => {
    const payload: any = {
      purchase_number: Math.floor(Math.random() * (999999999999 - 1)) + 1,
    };

    return payload.purchase_number;
  };

  const performSubmit = () => {
    if (isLoading) {
      return;
    }

    if (formRef.current) {
      setLoading(true);
      formRef.current?.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  };

  const onError = () => {
    setLoading(false);
  };

  const onForceClose = () => {
    onClose();
  };

  return (
    <Modal
      title="Guardar nueva tarjeta"
      show={show}
      hide={onClose}
      submitBtnText="Guardar"
      onSubmit={performSubmit}
      disabled={isLoading}
    >
      {show && (
        <NiubizForm
          config={
            availablePaymentGateways?.find(x => x.id === PROVIDERS.AUNA.id)
              ?.config
          }
          generatePurchaseNumber={generatePurchaseNumber}
          userDataForNiubiz={{
            documentNumber: user.documentNumber,
            email: user.email,
          }}
          formRef={formRef}
          onCardTokenization={onSubmit}
          onError={onError}
          onForceClose={onForceClose}
        />
      )}
    </Modal>
  );
};
