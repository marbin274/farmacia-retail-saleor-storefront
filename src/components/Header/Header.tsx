import { searchProductsService } from "@temp/@next/services/searchProductsService";
import { removePaymentItems } from "@temp/@next/utils/checkoutValidations";
import { useCart, useSignOut, useUserDetails } from "@temp/@sdk/react";
import * as appPaths from "@temp/app/routes";
import {
  Button,
  CartIcon,
  MenuIcon,
  PersonIcon,
  SearchIcon,
} from "@farmacia-retail/farmauna-components";
import logoImg from "images/logo.svg";
import React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import {
  MenuDropdown,
  Offline,
  Online,
  OverlayContext,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType,
} from "..";
import { SearchForm } from "../OverlayManager/Search";
import { IProps } from "./types";
import { useMediaScreen } from "@temp/@next/globalStyles";
import { links } from "@app/pages/AccountPage/paths";
import classNames from "classnames";
import * as S from "./styles";

const SEARCH_HEIGHT = 56;

const Header: React.FC<IProps> = ({
  categories,
  collections,
  hideMenuCondition,
  isLightHeader,
}) => {
  const [isVisibleSearchIcon, setVisibleSearchIcon] = React.useState<boolean>(
    false
  );
  const { data: user } = useUserDetails();
  const [signOut] = useSignOut();
  const { items } = useCart();

  const largeScreenPlusOne = "993";
  const {
    isMaxLargeScreen,
    isCustomMinScreen: isMinLargeScreenPlusOne,
  } = useMediaScreen(largeScreenPlusOne);

  const handleScroll = () => {
    const isVisible = window.scrollY >= SEARCH_HEIGHT;
    setVisibleSearchIcon(isVisible);
  };

  const onClickSearchIcon = (overlayContext: OverlayContextInterface) => {
    overlayContext.show(OverlayType.search, OverlayTheme.right);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeSearch = () => {
    searchProductsService.hide();
  };

  const handleSignOut = () => {
    signOut();
  };

  const cartItemsQuantity =
    (items &&
      items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) ||
    0;

  const renderHeaderUser = (
    overlayContext: OverlayContextInterface,
    isLeft = true
  ) => {
    const props = isLeft ? { suffixClass: "rightdown" } : {};
    if (user)
      return (
        <MenuDropdown
          {...props}
          head={
            <li className="fa-cursor-pointer fa-bg-neutral-light fa-w-8 fa-h-8 fa-flex fa-rounded-full fa-ml-2 md:fa-w-11 md:fa-h-11">
              <PersonIcon className="fa-m-auto" size={16} />
            </li>
          }
          content={
            <ul>
              {links.map((it, index) => (
                <li data-testid={`${it.testId}__link`}>
                  <Link
                    key={index}
                    className="fa-w-full fa-flex"
                    to={it.url}
                    onClick={closeSearch}
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
              <li
                className="fa-w-full fa-flex fa-cursor-pointer"
                onClick={() => {
                  handleSignOut();
                  closeSearch();
                }}
                data-testid="logout-link"
              >
                Cerrar sesión
              </li>
            </ul>
          }
        />
      );
    return (
      <li
        data-testid="login-btn"
        className="fa-cursor-pointer fa-bg-neutral-light fa-w-8 fa-h-8 fa-flex fa-rounded-full fa-ml-2 md:fa-w-11 md:fa-h-11"
        onClick={() => {
          overlayContext.show(OverlayType.login, OverlayTheme.center);
          closeSearch();
        }}
      >
        <PersonIcon className="fa-m-auto" size={16} />
      </li>
    );
  };

  const renderHeaderLogo = () => {
    return (
      <Link onClick={removePaymentItems} to={appPaths.baseUrl}>
        <ReactSVG path={logoImg} onClick={closeSearch} />
      </Link>
    );
  };

  const renderHeaderLeft = (overlayContext: OverlayContextInterface) => (
    <div>
      <ul className="fa-flex fa-items-center">
        {!hideMenuCondition && isMaxLargeScreen && (
          <S.ListHamburguer
            onClick={() =>
              overlayContext.show(OverlayType.sideNav, OverlayTheme.left, {
                data: {
                  categories,
                  collections,
                },
              })
            }
          >
            <Button
              icon={<MenuIcon size={16} onClick={closeSearch} />}
              iconOnly
            />
          </S.ListHamburguer>
        )}
        {isMinLargeScreenPlusOne && (
          <>
            {renderHeaderLogo()}
            {!hideMenuCondition && (
              <S.SearchContainer>
                <SearchForm />
              </S.SearchContainer>
            )}
          </>
        )}
        {isMaxLargeScreen && (
          <Online>
            {!hideMenuCondition && renderHeaderUser(overlayContext)}
          </Online>
        )}
      </ul>
    </div>
  );

  const renderHeaderCenter = () => {
    if (isMaxLargeScreen) {
      return (
        <div>
          {!hideMenuCondition ? (
            renderHeaderLogo()
          ) : (
            <div>{renderHeaderLogo()}</div>
          )}
        </div>
      );
    }
    return <></>;
  };

  const renderHeaderRight = (overlayContext: OverlayContextInterface) => {
    if (hideMenuCondition) return <></>;
    const canShowSearchIcon =
      (isMaxLargeScreen && isVisibleSearchIcon) ||
      (isLightHeader && isMaxLargeScreen);
    return (
      <div>
        <ul className="fa-flex fa-items-center">
          {isMinLargeScreenPlusOne && renderHeaderUser(overlayContext, false)}
          <Online>
            {canShowSearchIcon && (
              <li
                className="fa-cursor-pointer fa-w-8 fa-h-8 fa-bg-neutral-light fa-rounded-full fa-flex"
                onClick={() => onClickSearchIcon(overlayContext)}
              >
                <SearchIcon className="fa-m-auto" size={16} />
              </li>
            )}
            <li
              className="fa-cursor-pointer fa-rounded-full fa-border-solid fa-border fa-border-neutral-light fa-p-0.5 fa-ml-2 lg:fa-ml-4"
              onClick={() => {
                overlayContext.show(OverlayType.cart, OverlayTheme.right);
                closeSearch();
              }}
            >
              <div className="fa-relative fa-bg-neutral-light fa-w-8 fa-h-8 fa-flex fa-rounded-full lg:fa-w-11 lg:fa-h-11">
                <CartIcon className="fa-m-auto" />
                {cartItemsQuantity > 0 ? (
                  <span className="fa-absolute fa--top-2 fa--right-2 fa-bg-primary-medium fa-rounded-full fa-w-5 fa-h-5 fa-flex lg:fa-top-0">
                    <S.CartItemsQuantity>
                      {cartItemsQuantity}
                    </S.CartItemsQuantity>
                  </span>
                ) : null}
              </div>
            </li>
          </Online>
          <Offline>
            <li>{isMinLargeScreenPlusOne && <span>Offline</span>}</li>
          </Offline>
        </ul>
      </div>
    );
  };

  const renderHeader = (overlayContext: OverlayContextInterface) => {
    const justifyCenterLogo = hideMenuCondition && isMaxLargeScreen;
    const hasBorderHeader = isLightHeader && isMaxLargeScreen;
    return (
      <header
        className={classNames(
          "fa-bg-neutral-lightest fa-sticky fa-w-full fa-z-4 fa-top-0 fa-py-0 fa-px-4 fa-h-20 fa-max-h-20 lg:fa-z-3",
          {
            "fa-border-b fa-border-solid fa-border-light": hasBorderHeader,
          }
        )}
      >
        <S.MainHeader
          className={classNames("fa-m-auto fa-flex fa-h-20 fa-items-center", {
            "fa-justify-between": !justifyCenterLogo,
            "fa-justify-center": justifyCenterLogo,
          })}
          id="header"
        >
          {renderHeaderLeft(overlayContext)}
          {renderHeaderCenter()}
          {renderHeaderRight(overlayContext)}
        </S.MainHeader>
      </header>
    );
  };

  return <OverlayContext.Consumer>{renderHeader}</OverlayContext.Consumer>;
};

export default Header;
