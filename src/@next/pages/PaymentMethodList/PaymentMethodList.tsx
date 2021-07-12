import React, { FC, useState } from "react";
import { PaymentMethods } from "./components/PaymentMethods";
import { PatmentMethodFormModal } from "./components/PatmentMethodFormModal";
import { IProps } from "./types";

export const PaymentMethodList: FC<IProps> = ({ user }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div>
      <PaymentMethods
        creditCards={user?.cardTokens}
        onClickAdd={() => setShowAddModal(true)}
      />
      <PatmentMethodFormModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
};
