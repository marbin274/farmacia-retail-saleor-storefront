import React, { FC, useEffect, useRef, useState } from "react";
import {
  useSetDefaultUserCardToken,
  useDeleteUserCardToken,
  useCreateUserCardToken,
} from "@temp/@sdk/react";
import { alertService } from "@temp/@next/components/atoms/Alert";
import CreditCardIcon from "images/auna/credit-card.svg";
import { Alert } from "@components/molecules";
import { Modal } from "@components/organisms";
import { CheckIcon, TrashIcon } from "@farmacia-retail/farmauna-components";
import { PaymentMethods } from "./components/PaymentMethods";
import { PatmentMethodFormModal } from "./components/PatmentMethodFormModal";
import { IProps } from "./types";
import { ICardTokenizationResult } from "@temp/core/payments/niubiz";

export const PaymentMethodList: FC<IProps> = ({ user }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cardTokenToDelete, setCardTokenToDelete] = useState<string>();
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const addFormRef = useRef<HTMLFormElement>(null);

  const [
    createUserCardToken,
    { data: createData, error: createError, loading: createLoading },
  ] = useCreateUserCardToken();

  useEffect(() => {
    if (createData?.user && !createData?.errors.length && !createError) {
      setShowAddModal(false);
      setShowAddSuccess(true);
    }

    if (!createData?.user && (createData?.errors.length > 0 || createError)) {
      showGenericError();
    }
  }, [createData, createError]);

  const [
    setDefaultCardToken,
    {
      data: setDefaultData,
      error: setDefaultError,
      loading: setDefaultLoading,
    },
  ] = useSetDefaultUserCardToken();

  useEffect(() => {
    if (
      !setDefaultData?.user &&
      (setDefaultData?.errors.length > 0 || setDefaultError)
    ) {
      showGenericError();
    }
  }, [setDefaultData, setDefaultError]);

  const [
    deleteCardToken,
    { data: deleteData, error: deleteError, loading: deleteLoading },
  ] = useDeleteUserCardToken();

  useEffect(() => {
    if (deleteData?.user && !deleteData?.errors.length && !deleteError) {
      setShowDeleteSuccess(true);
    }

    if (!deleteData?.user && (deleteData?.errors.length > 0 || deleteError)) {
      showGenericError();
    }
  }, [deleteData, deleteError]);

  const showGenericError = () => {
    alertService.sendAlert({
      buttonText: "Entendido",
      message: "Ha ocurrido un error al procesar la solicitud",
      type: "Text",
    });
  };

  const clearAlers = () => {
    setShowAddSuccess(false);
    setShowDeleteSuccess(false);
  };

  const performSetDefault = (id: string) => {
    if (setDefaultLoading) {
      return;
    }
    setDefaultCardToken({ id });
  };

  const onClickDelete = (id: string) => {
    setCardTokenToDelete(id);
    setShowDeleteModal(true);
  };

  const performDelete = () => {
    if (deleteLoading || !cardTokenToDelete) {
      return;
    }

    clearAlers();
    deleteCardToken({ id: cardTokenToDelete });
    setShowDeleteModal(false);
  };

  const performCreate = (data: ICardTokenizationResult) => {
    if (createLoading) {
      return;
    }

    clearAlers();
    const { card, token } = data;

    createUserCardToken({
      input: {
        binNumber: card.bin,
        brand: card.brand,
        cardNumber: card.cardNumber,
        tokenId: token.tokenId,
        firstName: card.firstName,
        lastName: card.lastName,
        email: card.email,
      },
    });
  };

  return (
    <div>
      {showAddSuccess && (
        <Alert
          icon={<CheckIcon size={12} />}
          message="Tarjeta guardada con éxito"
          className="fa-mb-4"
        />
      )}
      {showDeleteSuccess && (
        <Alert
          icon={<TrashIcon size={12} />}
          message="La tarjeta ha sido eliminada"
          className="fa-mb-4"
          type="error"
        />
      )}
      <PaymentMethods
        creditCards={user?.cardTokens}
        onClickAdd={() => setShowAddModal(true)}
        onClickSetDefault={performSetDefault}
        onClickDelete={onClickDelete}
      />
      {showAddModal && (
        <PatmentMethodFormModal
          formRef={addFormRef}
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          user={user}
          loading={createLoading}
          onSubmit={performCreate}
        />
      )}
      <Modal
        show={showDeleteModal}
        hide={() => setShowDeleteModal(false)}
        submitBtnText="Sí, borrar"
        onSubmit={performDelete}
        title=""
        disabled={false}
      >
        <div className="fa-flex fa-items-center fa-flex-col">
          <img src={CreditCardIcon} alt="credit-card" className="fa-mb-6" />
          <p className="fa-text-center fa-mb-4">
            ¿Seguro que deseas borrar esta tarjeta de Farmauna?
          </p>
        </div>
      </Modal>
    </div>
  );
};
