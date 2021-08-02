import React, { FC, useState } from "react";
import { Modal, NiubizPaymentGateway } from "@components/organisms";
import { PROVIDERS } from "@temp/core/config";
import { useCheckout } from "@sdk/react";
import { IPaymentMethodFormModalProps } from "./types";
import { generateNiubizPurchaseNumber } from "@temp/@next/components/organisms/NiubizPaymentGateway/utils";

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
        <div className="fa-mt-4">
          <NiubizPaymentGateway
            config={
              availablePaymentGateways?.find(x => x.id === PROVIDERS.AUNA.id)
                ?.config
            }
            generatePurchaseNumber={generateNiubizPurchaseNumber}
            userDataForNiubiz={{
              documentNumber: user.documentNumber,
              email: user.email,
            }}
            formRef={formRef}
            onCardTokenization={onSubmit}
            onError={onError}
            onForceReRender={onForceClose}
            saveCardSelected
            fullWidthInputs
          />
        </div>
      )}
    </Modal>
  );
};
