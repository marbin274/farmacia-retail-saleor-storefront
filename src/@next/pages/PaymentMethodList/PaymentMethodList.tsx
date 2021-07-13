import React, { FC, useEffect, useState } from "react";
import {
  useSetDefaultUserCardToken,
  useDeleteUserCardToken,
} from "@temp/@sdk/react";
import { alertService } from "@temp/@next/components/atoms/Alert";
import CreditCardIcon from "images/auna/credit-card.svg";
import { Modal } from "@components/organisms";
import { PaymentMethods } from "./components/PaymentMethods";
import { PatmentMethodFormModal } from "./components/PatmentMethodFormModal";
import { IProps } from "./types";

export const PaymentMethodList: FC<IProps> = ({ user }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cardTokenToDelete, setCardTokenToDelete] = useState<string>();

  const [
    setDefaultCardToken,
    {
      data: setDefaultData,
      error: setDefaultError,
      loading: setDefaultLoading,
    },
  ] = useSetDefaultUserCardToken();

  const [
    deleteCardToken,
    { data: deleteData, error: deleteError, loading: deleteLoading },
  ] = useDeleteUserCardToken();

  useEffect(() => {
    if (
      !setDefaultData?.user &&
      (setDefaultData?.errors.length > 0 || setDefaultError)
    ) {
      showGenericError();
    }
  }, [setDefaultData, setDefaultError]);

  useEffect(() => {
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

    deleteCardToken({ id: cardTokenToDelete });
    setShowDeleteModal(false);
  };

  return (
    <div>
      <PaymentMethods
        creditCards={user?.cardTokens}
        onClickAdd={() => setShowAddModal(true)}
        onClickSetDefault={performSetDefault}
        onClickDelete={onClickDelete}
      />
      <PatmentMethodFormModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        user={user}
      />
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
