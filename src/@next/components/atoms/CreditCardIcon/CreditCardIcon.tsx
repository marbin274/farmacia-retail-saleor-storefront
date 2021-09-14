import React from 'react';
import { ReactSVG } from 'react-svg';

import americanExpress from 'images/auna/american-express-payment.svg';
import discoverImg from 'images/discover.svg';
import jcbImg from 'images/jcb.svg';
import maestroImg from 'images/maestro.svg';
import mastercardImg from 'images/mastercard.svg';
import visaImg from 'images/visa.svg';
import dinersClub from 'images/auna/diners-club-payment.svg';

import * as S from './styles';
import { IProps } from './types';

const providers = new Map();

providers.set('visa', visaImg);
providers.set('maestro', maestroImg);
providers.set('mastercard', mastercardImg);
providers.set('amex', americanExpress);
providers.set('diners-club', dinersClub);
providers.set('jcb', jcbImg);
providers.set('discover', discoverImg);

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
