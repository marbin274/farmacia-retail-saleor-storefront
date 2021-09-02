import OutOfTimeIcon from '@temp/images/auna/out-of-time.svg';
import * as React from 'react';
import ReactSVG from 'react-svg';

export interface IProps {
  isShippingAvailable: boolean;
}

export const OutOfTimeMessage = ({ isShippingAvailable }: IProps) => {
  return !isShippingAvailable ? (
    <div className="fa-flex fa-flex-wrap fa-items-center fa-mt-4 fa-rounded-2xl fa-p-4 fa-max-w-xs fa-bg-informative-lightest fa-text-black">
      <div className="fa-flex fa-items-center">
        <ReactSVG
          path={OutOfTimeIcon}
          className="fa-my-0 fa-mr-2 fa-pt-2 fa-w-20"
        />
        <div className="fa-text-sm fa-font-semibold">
          <p>Entregaremos tu pedido a partir de las 7:00 a.m.</p>
        </div>
      </div>
      <div className="fa-w-full fa-text-sm fa-font-normal fa-mt-2">
        <p>
          Te informaremos cuando el motorizado salga a la dirección indicada.
        </p>
      </div>
    </div>
  ) : null;
};
