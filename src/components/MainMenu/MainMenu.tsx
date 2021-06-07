import { AddressGeocalization } from "@temp/@next/components/molecules";
import React from "react";
import { DesktopNav } from "../DesktopNav";
import * as S from "./styles";
import { IProps } from "./types";

export const MainMenu: React.FC<IProps> = ({categories, navMain}) => {    
    
    return (

        <S.Wrapper>
            <S.Container className="container">
                <S.Menu>
                    <DesktopNav categories={categories} navMain={navMain} />
                </S.Menu>
                <S.WrapperAddressGeo>
                    <AddressGeocalization mode="ligth" />
                </S.WrapperAddressGeo>
            </S.Container>
        </S.Wrapper>
    );
}
