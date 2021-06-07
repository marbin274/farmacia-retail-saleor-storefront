import React from "react";
import * as S from "./styles";

interface IProps {
    open: boolean
}

export const IconHamburger: React.FC<IProps> = ({ open }) => {

    return (
        <S.Wrapper open={open}>
            <S.FirstLine open={open} />
            <S.SecondLine open={open} />
            <S.ThirdLine open={open} />
        </S.Wrapper>
    );
}
