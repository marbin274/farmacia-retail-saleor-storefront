import React, { FC } from 'react';

export const PaymentYape: FC = () => {
  return (
    <>
      <img
        src="/assets/auna/yape.svg"
        width={32}
        height={32}
        className="fa-mr-2"
      />
      <div className="fa-text-xs fa-leading-4">
        El motorizado llevará el POS para que puedas realizar el pago con código
        QR una vez te hayan entregado tu pedido.
      </div>
    </>
  );
};
