import { AddressGeocalization } from "@temp/@next/components/molecules";
import { largeScreen } from "@temp/@next/globalStyles/constants";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { DesktopNav } from "../DesktopNav";
import { SearchForm } from "../OverlayManager/Search";
import * as S from "./styles";
import { IProps } from "./types";

export const MainMenu: React.FC<IProps> = ({
  categories,
  hideMenuCondition,
  navMain,
  isProductPage,
}) => {
  const isMaxLargeScreen = useMediaQuery({
    query: `(max-width: ${largeScreen}px)`,
  });
  const canShowSearch = isMaxLargeScreen && !isProductPage;
  const isProductDetail = isMaxLargeScreen && isProductPage;
  return (
    <>
      {!hideMenuCondition && (
        <S.Wrapper isProductDetail={isProductDetail}>
          {canShowSearch && (
            <S.ContainerSearch>
              <SearchForm />
            </S.ContainerSearch>
          )}
          <S.Container className="container">
            <S.Menu>
              <DesktopNav categories={categories} navMain={navMain} />
            </S.Menu>
            <S.WrapperAddressGeo isProductDetail={isProductDetail}>
              <AddressGeocalization mode="ligth" />
            </S.WrapperAddressGeo>
          </S.Container>
        </S.Wrapper>
      )}
    </>
  );
};
