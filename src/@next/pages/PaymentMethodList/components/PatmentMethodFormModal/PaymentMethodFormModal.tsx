import React, { FC, useEffect, useRef, useState } from "react";
import { Modal } from "@components/organisms";
import { IPaymentMethodFormModalProps } from "./types";
import { NiubizForm } from "../NiubizForm";
import { ICardTokenizationResult } from "@temp/core/payments/niubiz";
import { useCreateUserCardToken } from "@temp/@sdk/react";
import { alertService } from "@temp/@next/components/atoms/Alert";

export const PatmentMethodFormModal: FC<IPaymentMethodFormModalProps> = ({
  onClose,
  show,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [
    createUserCardToken,
    { data: createData, error: createError },
  ] = useCreateUserCardToken();

  useEffect(() => {
    if (createData?.user && !createData?.errors.length && !createError) {
      onClose?.();
    }

    if (!createData?.user && (createData?.errors.length > 0 || createError)) {
      alertService.sendAlert({
        buttonText: "Entendido",
        message: "Ha ocurrido un error al procesar la solicitud",
        type: "Text",
      });
    }
  }, [createData, createError]);

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
    createUserCardToken({
      input: {
        binNumber: data.card.bin,
        brand: data.card.brand,
        cardNumber: data.card.cardNumber,
        tokenId: data.token.tokenId,
      },
    });
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
            documentNumber: user.documentNumber,
            email: user.email,
          }}
          formRef={formRef}
          onCardTokenization={handleCardTokenization}
          onError={onError}
        />
      )}
    </Modal>
  );
};
