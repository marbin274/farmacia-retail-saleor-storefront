import React, { FC, useEffect, useState } from "react";
import { useSetDefaultUserCardToken } from "@temp/@sdk/react";
import { PaymentMethods } from "./components/PaymentMethods";
import { PatmentMethodFormModal } from "./components/PatmentMethodFormModal";
import { IProps } from "./types";

export const PaymentMethodList: FC<IProps> = ({ user }) => {
  const [showAddModal, setShowAddModal] = useState(false);

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
      // TODO: mostrar error
    }
  }, [setDefaultData, setDefaultError]);

  const performSetDefault = (id: string) => {
    if (setDefaultLoading) {
      return;
    }
    setDefaultCardToken({ id });
  };

  return (
    <div>
      <PaymentMethods
        creditCards={user?.cardTokens}
        onClickAdd={() => setShowAddModal(true)}
        onClickSetDefault={performSetDefault}
      />
      <PatmentMethodFormModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        user={user}
      />
    </div>
  );
};
