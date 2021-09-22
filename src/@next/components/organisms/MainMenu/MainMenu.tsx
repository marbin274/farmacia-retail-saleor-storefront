import { useMediaScreen } from '@temp/@next/globalStyles';
import React, { useContext } from 'react';
import { DesktopNav } from '@components/organisms/DesktopNav';
import {
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from '@components/organisms/OverlayComponent';
import { SearchForm } from '../OverlayManager/Search';
import * as S from './styles';
import { IProps } from './types';
import { AddressGeocalization } from '@components/molecules';

export const MainMenu: React.FC<IProps> = ({
  categories,
  hideMenuCondition,
  navMain,
  hideMenuConditionMobile,
  isLightHeader,
}) => {
  const { isMaxLargeScreen } = useMediaScreen();
  const overlayContext = useContext(OverlayContext);
  const canShowSearch = isMaxLargeScreen && !isLightHeader;
  const isProductDetail = isMaxLargeScreen && isLightHeader;
  const onClickSearchIcon = () => {
    overlayContext.show(OverlayType.search, OverlayTheme.right);
  };
  const hideMenu = hideMenuCondition || hideMenuConditionMobile;
  return (
    <>
      {!hideMenu && (
        <S.Wrapper isProductDetail={isProductDetail}>
          {canShowSearch && (
            <S.ContainerSearch>
              <SearchForm />
              <div
                className="fa-absolute fa-w-full fa-h-full fa-top-0 fa-left-0 fa-block"
                onClick={onClickSearchIcon}
              />
            </S.ContainerSearch>
          )}
          <S.Container>
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

export default MainMenu;
