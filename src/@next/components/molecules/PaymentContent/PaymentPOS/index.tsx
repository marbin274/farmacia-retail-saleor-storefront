import React, { FC } from 'react';
import * as S from './styles';

export const PaymentPOS: FC = () => {
  return (
    <>
      <div className="fa-text-xs fa-leading-5 fa-font-semibold fa-mb-4">
        El motorizado llevará el POS de Niubiz para que pagues como prefieras:
      </div>
      <div className="fa-flex fa-items-center">
        <img
          src="/assets/auna/pos.svg"
          width={32}
          height={32}
          className="fa-mr-2"
        />
        <div>
          <p className="fa-text-xs fa-leading-5 fa-font-normal fa-mb-2">
            Con tu tarjeta de crédito o débito
          </p>
          <div className="fa-flex fa-items-center">
            <img
              src="/assets/auna/niubiz-text.svg"
              width={58}
              height={14}
              className="fa-mr-2.5"
            />
            <S.IconCard src="/assets/auna/visa-payment.svg" />
            <S.IconCard
              src="/assets/auna/mastercard-payment.svg"
              className="fa-mr-0.5"
            />
            <img
              src="/assets/auna/american-express-payment.svg"
              width={32}
              height={20}
              className="fa-mr-1"
            />
            <img
              src="/assets/auna/diners-club-payment.svg"
              width={32}
              height={20}
            />
          </div>
        </div>
      </div>
    </>
  );
};
