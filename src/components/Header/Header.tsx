import { useCart, useSignOut, useUserDetails } from "@sdk/react";
import { removePaymentItems } from "@temp/@next/utils/checkoutValidations";
import * as appPaths from "@temp/app/routes";
import cartImg from "images/cart.svg";
import hamburgerImg from "images/hamburger.svg";
import logoImg from "images/logo.svg";
import userImg from "images/user.svg";
import React from "react";
import Media from "react-media";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import {
  MenuDropdown,
  Offline,
  Online,
  OverlayContext,
  OverlayTheme,
  OverlayType
} from "..";
import {
  mediumScreen,
  smallScreen
} from "../../globalStyles/scss/variables.scss";
import { SearchForm } from "../OverlayManager/Search";
import "./scss/index.scss";
import { IProps } from "./types";

const Header: React.FC<IProps> = ({ categories, hideMenuCondition }) => {
  const { data: user } = useUserDetails();
  const [signOut] = useSignOut();
  const { items } = useCart();


  const mediumScreenPlusOne = "993px";

  const handleSignOut = () => {
    signOut();
  };

  const cartItemsQuantity =
    (items &&
      items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) ||
    0;

  return (
    <header>
      <OverlayContext.Consumer>
        {overlayContext => (
          <nav className="main-header" id="header">
            <div className="main-header__left">
              <ul>
                {!hideMenuCondition ? (
                  <Media
                    query={{ maxWidth: mediumScreen }}
                    render={() => (
                      <li
                        className="main-header__hamburger"
                        onClick={() =>
                          overlayContext.show(
                            OverlayType.sideNav,
                            OverlayTheme.left,
                            { data: categories }
                          )
                        }
                      >
                        <ReactSVG
                          path={hamburgerImg}
                          className={"main-header__hamburger--icon"}
                        />
                      </li>
                    )}
                  />
                ) : (
                  <></>
                )}
                <Media
                  query={{ minWidth: mediumScreenPlusOne }}
                  render={() => (
                    <Link
                      onClick={removePaymentItems}
                      to={appPaths.baseUrl}
                    >
                      <ReactSVG path={logoImg} />
                    </Link>
                  )}
                />
                <Online>
                  <Media
                    query={{ maxWidth: smallScreen }}
                    render={() => (
                      <>
                        {!hideMenuCondition ? (
                          <>
                            {user ? (
                              <MenuDropdown
                                suffixClass={"__rightdown"}
                                head={
                                  <li className="main-header__icon main-header__user--active">
                                    <ReactSVG path={userImg} />
                                  </li>
                                }
                                content={
                                  <ul className="main-header__dropdown">
                                    <li data-testid="my_account__link">
                                      <Link to={appPaths.accountUrl}>
                                        Mi cuenta
                                          </Link>
                                    </li>
                                    <li data-testid="address_book__link">
                                      <Link to={appPaths.addressBookUrl}>
                                        Mis direcciones
                                          </Link>
                                    </li>
                                    <li data-testid="order_history__link">
                                      <Link to={appPaths.orderHistoryUrl}>
                                        Historial de pedidos
                                          </Link>
                                    </li>
                                    <li
                                      onClick={handleSignOut}
                                      data-testid="logout-link"
                                    >
                                      Cerrar sesión
                                        </li>
                                  </ul>
                                }
                              />
                            ) : (
                              <li
                                data-testid="login-btn"
                                className="main-header__icon"
                                onClick={() =>
                                  overlayContext.show(
                                    OverlayType.login,
                                    OverlayTheme.left
                                  )
                                }
                              >
                                <ReactSVG path={userImg} />
                              </li>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  />
                </Online>
              </ul>
            </div>

            <div className="main-header__center">
              {!hideMenuCondition ? (
                <Media
                  query={{ maxWidth: mediumScreen }}
                  render={() => (
                    <Link
                      onClick={removePaymentItems}
                      to={appPaths.baseUrl}
                      className="main-header__center--icon"
                    >
                      <ReactSVG path={logoImg} className="logo" />
                    </Link>
                  )}
                />
              ) : (
                <div className="icon_container">
                  <Media
                    query={{ maxWidth: mediumScreen }}
                    render={() => (
                      <Link onClick={removePaymentItems} to={appPaths.baseUrl}>
                        <ReactSVG path={logoImg} className="logo" />
                      </Link>
                    )}
                  />
                </div>
              )}
            </div>
            {!hideMenuCondition ? (
              <div className="main-header__right">
                <ul>
                  <Media
                    query={{ minWidth: smallScreen }}
                    render={() => (
                      <>
                        {user ? (
                          <MenuDropdown
                            head={
                              <li className="main-header__icon main-header__user--active">
                                <ReactSVG path={userImg} />
                              </li>
                            }
                            content={
                              <ul className="main-header__dropdown">
                                <li data-testid="my_account__link">
                                  <Link to={appPaths.accountUrl}>Mi cuenta</Link>
                                </li>
                                <li data-testid="address_book__link">
                                  <Link to={appPaths.addressBookUrl}>
                                    Mis direcciones
                                </Link>
                                </li>
                                <li data-testid="order_history__link">
                                  <Link to={appPaths.orderHistoryUrl}>
                                    Historial de pedidos
                                </Link>
                                </li>
                                <li
                                  onClick={handleSignOut}
                                  data-testid="logout-link"
                                >
                                  Cerrar sesión
                              </li>
                              </ul>
                            }
                          />
                        ) : (
                          <li
                            data-testid="login-btn"
                            className="main-header__icon main-header__login"
                            onClick={() =>
                              overlayContext.show(
                                OverlayType.login,
                                OverlayTheme.right
                              )
                            }
                          >
                            <ReactSVG path={userImg} />
                          </li>
                        )}
                      </>
                    )}
                  />
                  <Online>
                    <li
                      className="main-header__icon main-header__cart"
                      onClick={() => {
                        overlayContext.show(OverlayType.cart, OverlayTheme.right);
                      }}
                    >
                      <ReactSVG path={cartImg} />
                      {cartItemsQuantity > 0 ? (
                        <span className="main-header__cart__quantity">
                          {cartItemsQuantity}
                        </span>
                      ) : null}
                    </li>
                  </Online>
                  <Offline>
                    <li className="main-header__offline">
                      <Media
                        query={{ minWidth: mediumScreen }}
                        render={() => <span>Offline</span>}
                      />
                    </li>
                  </Offline>
                </ul>
              </div>
            ) : (
              <></>
            )}
            {
              !hideMenuCondition &&
              <div className="main-header__search">
                <SearchForm />
              </div>
            }
          </nav>
        )}
      </OverlayContext.Consumer>
    </header>
  );
};

export default Header;
