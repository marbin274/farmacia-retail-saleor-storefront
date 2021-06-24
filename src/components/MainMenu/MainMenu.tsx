import { AddressGeocalization } from "@temp/@next/components/molecules";
import { largeScreen } from "@temp/@next/globalStyles/constants";
import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { DesktopNav } from "../DesktopNav";
import { OverlayContext, OverlayTheme, OverlayType } from "../Overlay";
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
  const overlayContext = useContext(OverlayContext);
  const canShowSearch = isMaxLargeScreen && !isProductPage;
  const isProductDetail = isMaxLargeScreen && isProductPage;
  const onClickSearchIcon = () => {
    overlayContext.show(OverlayType.search, OverlayTheme.right);
  };
  return (
    <>
      {!hideMenuCondition && (
        <S.Wrapper isProductDetail={isProductDetail}>
          {canShowSearch && (
            <S.ContainerSearch>
              <SearchForm />        
              <div 
                  className='fa-absolute fa-w-full fa-h-full fa-top-0 fa-left-0 fa-block'
                  onClick={onClickSearchIcon} />    
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
