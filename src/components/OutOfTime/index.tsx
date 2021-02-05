import { Button } from "@components/atoms";
import { EmailLink } from '@temp/@next/components/atoms';
import { Overlay, OverlayContextInterface } from '@temp/components/Overlay';
import { CONSULTATION_EMAIL } from '@temp/core/config';
import OutOfTimeIcon from '@temp/images/auna/out-of-time.svg';
import * as React from 'react';
import ReactSVG from 'react-svg';
import './scss/index.scss';

export interface IProps {
    overlay: OverlayContextInterface
}

const OutOfTime = ({ overlay }: IProps) => {
    const { hide } = overlay;
    return <>
        <Overlay context={{ ...overlay, hide: undefined }}>
            <div className="overlay__modal__wrapper">
                <div className="overlay__modal__wrapper__card">
                    <div className="overlay__modal__wrapper__card__header">
                        <h4>Hola, tus compras después de las 11:00 p.m. llegarán al día siguiente a partir de las 7:00 a.m.</h4>
                    </div>
                    <div className="overlay__modal__wrapper__card__body">
                        <div className="overlay__modal__wrapper__card__body__text">
                            <div>
                                <p>Si tienes dudas comunicate con nosotros.</p>
                                <EmailLink link={CONSULTATION_EMAIL} />
                            </div>
                            <div className="overlay__modal__wrapper__card__body__text__button">
                                <br />
                                <Button
                                    fullWidth
                                    onClick={hide}
                                >Entendido</Button>
                            </div>
                        </div>
                        <ReactSVG path={OutOfTimeIcon} className="overlay__modal__wrapper__card__body__image" />
                        <div className="overlay__modal__wrapper__card__body__footer">
                            <div>
                                <Button
                                    fullWidth
                                    onClick={hide}
                                >Entendido</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Overlay>
    </>;
}

export default OutOfTime;

