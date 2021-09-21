import React, { FC } from 'react';
import NiubizIcon from 'images/auna/niubiz-text.svg';
import VisaIcon from 'images/auna/visa-payment.svg';
import MastercardIcon from 'images/auna/mastercard-payment.svg';
import AmericanIcon from 'images/auna/american-express-payment.svg';
import DinnersIcon from 'images/auna/diners-club-payment.svg';
import PosIcon from 'images/auna/pos.svg';
import * as S from './styles';

export const PaymentPOS: FC = () => {
  return (
    <>
      <div className="fa-text-xs fa-leading-5 fa-font-semibold fa-mb-4">
        El motorizado llevará el POS de Niubiz para que pagues como prefieras:
      </div>
      <div className="fa-flex fa-items-center">
        <img src={PosIcon} width={32} height={32} className="fa-mr-2" />
        <div>
          <p className="fa-text-xs fa-leading-5 fa-font-normal fa-mb-2">
            Con tu tarjeta de crédito o débito
          </p>
          <div className="fa-flex fa-items-center">
            <img
              src={NiubizIcon}
              width={58}
              height={14}
              className="fa-mr-2.5"
            />
            <S.IconCard src={VisaIcon} />
            <S.IconCard src={MastercardIcon} className="fa-mr-0.5" />
            <img
              src={AmericanIcon}
              width={32}
              height={20}
              className="fa-mr-1"
            />
            <img src={DinnersIcon} width={32} height={20} />
          </div>
        </div>
      </div>
    </>
  );
};
