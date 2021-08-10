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
import "./scss/index.scss";
import { IProps } from "./types";
import { useMediaScreen } from "@temp/@next/globalStyles";
import { links } from "@app/pages/AccountPage/paths";

const SEARCH_HEIGHT = 56;

const Header: React.FC<IProps> = ({
  categories,
  collections,
  hideMenuCondition,
  isLightHeader,
}) => {
  const [isVisibleSearchIcon, setVisibleSearchIcon] =
    React.useState<boolean>(false);
  const { data: user } = useUserDetails();
  const [signOut] = useSignOut();
  const { items } = useCart();

  const largeScreenPlusOne = "993";
  const { isMaxLargeScreen, isCustomMinScreen: isMinLargeScreenPlusOne } = useMediaScreen(largeScreenPlusOne);

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
    const props = isLeft ? { suffixClass: "__rightdown" } : {};
    if (user)
      return (
        <MenuDropdown
          {...props}
          head={
            <li className="main-header__icon main-header__user">
              <PersonIcon size={16} />
            </li>
          }
          content={
            <ul className="main-header__dropdown">
              {
                links.map((it, index) =>
                  <li key={index} data-testid={`${it.testId}__link`}>
                    <Link className="fa-w-full fa-flex" to={it.url} onClick={closeSearch}>
                      {it.label}
                    </Link>
                  </li>
                )
              }
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
        className={`main-header__icon main-header__user`}
        onClick={() => {
          overlayContext.show(OverlayType.login, OverlayTheme.center);
          closeSearch();
        }}
      >
        <PersonIcon size={16} />
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
    <div className="main-header__left">
      <ul>
        {!hideMenuCondition && isMaxLargeScreen && (
          <li
            className="main-header__hamburguer"
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
              iconOnly
              icon={<MenuIcon size={16} onClick={closeSearch} />}
            />
          </li>
        )}
        {isMinLargeScreenPlusOne && (
          <>
            {renderHeaderLogo()}
            {!hideMenuCondition && (
              <div className="main-header__search">
                <SearchForm />
              </div>
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
        <div className="main-header__center">
          {!hideMenuCondition ? (
            renderHeaderLogo()
          ) : (
            <div className="icon_container">{renderHeaderLogo()}</div>
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
      <div className="main-header__right">
        <ul>
          {isMinLargeScreenPlusOne && renderHeaderUser(overlayContext, false)}
          <Online>
            {canShowSearchIcon && (
              <li
                className="main-header__icon main-header__search-icon"
                onClick={() => onClickSearchIcon(overlayContext)}
              >
                <SearchIcon size={16} />
              </li>
            )}
            <li
              className="main-header__icon main-header__cart"
              onClick={() => {
                overlayContext.show(OverlayType.cart, OverlayTheme.right);
                closeSearch();
              }}
            >
              <div className="main-header__cart__box">
                <CartIcon />
                {cartItemsQuantity > 0 ? (
                  <span className="main-header__cart__box__quantity">
                    <span>{cartItemsQuantity}</span>
                  </span>
                ) : null}
              </div>
            </li>
          </Online>
          <Offline>
            <li className="main-header__offline">
              {isMinLargeScreenPlusOne && <span>Offline</span>}
            </li>
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
        className={`header ${hasBorderHeader && "header__border-bottom"}`}
      >
        <nav
          className={`main-header ${justifyCenterLogo && "justify-center"}`}
          id="header"
        >
          {renderHeaderLeft(overlayContext)}
          {renderHeaderCenter()}
          {renderHeaderRight(overlayContext)}
        </nav>
      </header>
    );
  };

  return <OverlayContext.Consumer>{renderHeader}</OverlayContext.Consumer>;
};

export default Header;
