import OutOfTimeIcon from '@temp/images/auna/out-of-time.svg';
import * as React from 'react';
import ReactSVG from 'react-svg';
import './scss/index.scss';

export interface IProps {
    isShippingAvailable: boolean
}

export const OutOfTimeMessage = ({ isShippingAvailable }: IProps) => {
    return !isShippingAvailable ?
        <div className="out-of-time-message">
            <ReactSVG path={OutOfTimeIcon} className="out-of-time-message__icon" />
            <div className="out-of-time-message__title">
                <p>Entregaremos tu pedido a partir de las 7:00 a.m.</p>
            </div>
            <div className="out-of-time-message__text">
                <p>Te informaremos cuando el motorizado salga a la dirección indicada.</p>
            </div>
        </div> : null;
}
