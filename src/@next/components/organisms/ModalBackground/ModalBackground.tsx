import { Overlay } from "@components/organisms";
import React from "react";
import './scss/index.scss';
import * as S from "./styles";
import { IProps } from "./types";
import {  smallScreen } from "@temp/@next/globalStyles/constants";
import ReactSVG from "react-svg";
import closeMobile  from "@temp/images/close-modal-mobile.svg";
import closeDesktop  from "@temp/images/close-mobile-desktop.svg";


import  Media  from 'react-media';


export const ModalBackground: React.FC<IProps> = ({
  hide,
  show,
  target,
  imageDesktop,
  imageMobile,
}: IProps) => {

  return (
    <Overlay position="center" show={show} hide={hide} target={target}>
      <div className="modal__container">
        <S.Modal
          imageDesktop={imageDesktop}
          imageMobile={imageMobile} >
         <S.CloseDiv  onClick={hide}>
            <Media query={{ maxWidth: smallScreen }}>
              {(matches: any) =>
                matches ?  <ReactSVG path={closeMobile} />  : <ReactSVG path={closeDesktop} />}
            </Media> 
         </S.CloseDiv>
        </S.Modal>
      </div>
    </Overlay>
  );
};
