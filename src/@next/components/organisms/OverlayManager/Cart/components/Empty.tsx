import * as React from 'react';
import { ReactSVG } from 'react-svg';
import { Button } from '@farmacia-retail/farmauna-components';
import emptyCartImg from '../../../../../../images/empty-cart.svg';
import { CartEmpty } from '../styles';

const Empty: React.FC<{ overlayHide(): void }> = ({ overlayHide }) => (
  <CartEmpty className="fa-items-center fa-flex fa-flex-col fa-justify-center fa-py-8 fa-px-4">
    <ReactSVG src={emptyCartImg} className="fa-mt-32 fa-mb-9" />
    <h4 className="fa-text-base fa-leading-6 fa-font-semibold fa-mb-4 fa-text-neutral-darkest">
      Carrito vacío
    </h4>
    <p className="fa-text-sm fa-leading-6 fa-font-normal fa-w-56 fa-text-center">
      Seguro encontrarás algunos productos para agregar
    </p>
    <div className="fa-mt-7 fa-text-center fa-text-base">
      <Button onClick={overlayHide} className="fa-font-semibold fa-leading-6">
        Explorar productos
      </Button>
    </div>
  </CartEmpty>
);

export default Empty;
