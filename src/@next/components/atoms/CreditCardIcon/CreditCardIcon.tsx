import React from 'react';
import { ReactSVG } from 'react-svg';
import * as S from './styles';
import { IProps } from './types';

const providers = new Map();

providers.set('visa', '/assets/visa.svg');
providers.set('maestro', '/assets/maestro.svg');
providers.set('mastercard', '/assets/mastercard.svg');
providers.set('amex', '/assets/auna/american-express-payment.svg');
providers.set('diners-club', '/assets/auna/diners-club-payment.svg');
providers.set('jcb', '/assets/jcb.svg');
providers.set('discover', '/assets/discover.svg');

export const CreditCardIcon: React.FC<IProps> = ({
  creditCardProvider,
}: IProps) => {
  return (
    <S.CreditCardIcon>
      {providers.has(creditCardProvider) && (
        <ReactSVG
          role={`payment-${creditCardProvider}`}
          src={providers.get(creditCardProvider)}
        />
      )}
    </S.CreditCardIcon>
  );
};
