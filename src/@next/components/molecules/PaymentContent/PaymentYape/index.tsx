import React, { FC } from 'react';
import YapeIcon from 'images/auna/yape.svg';

export const PaymentYape: FC = () => {
  return (
    <>
      <img src={YapeIcon} width={32} height={32} className="fa-mr-2" />
      <div className="fa-text-xs fa-leading-4">
        El motorizado llevará el POS para que puedas realizar el pago con código
        QR una vez te hayan entregado tu pedido.
      </div>
    </>
  );
};
