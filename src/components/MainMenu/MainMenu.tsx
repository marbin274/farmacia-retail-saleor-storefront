import React from "react";
import {
  mediumScreen,
  smallScreen,
} from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";

import { useCart, useSignOut, useUserDetails } from "@sdk/react";

import Media from "react-media";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import {
  MenuDropdown,
  Offline,
  Online,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "..";
import * as appPaths from "../../app/routes";
import { maybe } from "../../core/utils";
import NavDropdown from "./NavDropdown";
import { TypedMainMenuQuery } from "./queries";

import cartImg from "../../images/cart.svg";
import hamburgerImg from "../../images/hamburger.svg";
import logoImg from "../../images/logo.svg";
import searchImg from "../../images/search.svg";
import userImg from "../../images/user.svg";

const MainMenu: React.FC = () => {
  const { data: user } = useUserDetails();
  const [signOut] = useSignOut();
  const { items } = useCart();

  const handleSignOut = () => {
    signOut();
  };

  const cartItemsQuantity =
    (items &&
      items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) ||
    0;

  return (
    <OverlayContext.Consumer>
      {overlayContext => (
        <nav className="main-menu" id="header">
          <div className="main-menu__left">
            <TypedMainMenuQuery renderOnError displayLoader={false}>
              {({ data }) => {
                const items = maybe(() => data.shop.navigation.main.items, []);

                return (
                  <ul>
                    <Media
                      query={{ maxWidth: mediumScreen }}
                      render={() => (
                        <li
                          className="main-menu__hamburger"
                          onClick={() =>
                            overlayContext.show(
                              OverlayType.sideNav,
                              OverlayTheme.left,
                              { data: items }
                            )
                          }
                        >
                          <ReactSVG
                            path={hamburgerImg}
                            className={"main-menu__hamburger--icon"}
                          />
                        </li>
                      )}
                    />
                    <Media
                      query={{ minWidth: mediumScreen }}
                      render={() => (
                        <Link to={appPaths.baseUrl}>
                          <ReactSVG path={logoImg} />
                        </Link>
                      )}
                    />
                    <Online>
                      <Media
                        query={{ maxWidth: smallScreen }}
                        render={() => (
                          <>
                            {user ? (
                              <MenuDropdown
                                suffixClass={"__rightdown"}
                                head={
                                  <li className="main-menu__icon main-menu__user--active">
                                    <ReactSVG path={userImg} />
                                  </li>
                                }
                                content={
                                  <ul className="main-menu__dropdown">
                                    <li data-testid="my_account__link">
                                      <Link to={appPaths.accountUrl}>
                                        Mi cuenta
                                      </Link>
                                    </li>
                                    {/* <li data-testid="order_history__link">
                                      <Link to={appPaths.orderHistoryUrl}>
                                        Order history
                                      </Link>
                                    </li> */}
                                    <li data-testid="address_book__link">
                                      <Link to={appPaths.addressBookUrl}>
                                        Mis direcciones
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
                                className="main-menu__icon"
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
                        )}
                      />
                    </Online>
                  </ul>
                );
              }}
            </TypedMainMenuQuery>
          </div>

          <div className="main-menu__center">
            <TypedMainMenuQuery renderOnError displayLoader={false}>
              {({ data }) => {
                const items = maybe(() => data.shop.navigation.main.items, []);

                return (
                  <ul>
                    <Media
                      query={{ minWidth: mediumScreen }}
                      render={() =>
                        items.map(item => (
                          <li
                            data-cy="main-menu__item"
                            className="main-menu__item"
                            key={item.id}
                          >
                            <NavDropdown overlay={overlayContext} {...item} />
                          </li>
                        ))
                      }
                    />
                  </ul>
                );
              }}
            </TypedMainMenuQuery>
            <Media
              query={{ maxWidth: mediumScreen }}
              render={() => (
                <Link to={appPaths.baseUrl} className="main-menu__center--icon">
                  <ReactSVG path={logoImg} />
                </Link>
              )}
            />
          </div>

          <div className="main-menu__right">
            <ul>
              <Media
                query={{ minWidth: smallScreen }}
                render={() => (
                  <>
                    {user ? (
                      <MenuDropdown
                        head={
                          <li className="main-menu__icon main-menu__user--active">
                            <ReactSVG path={userImg} />
                          </li>
                        }
                        content={
                          <ul className="main-menu__dropdown">
                            <li data-testid="my_account__link">
                              <Link to={appPaths.accountUrl}>Mi cuenta</Link>
                            </li>
                            {/* <li data-testid="order_history__link">
                              <Link to={appPaths.orderHistoryUrl}>
                                Order history
                              </Link>
                            </li> */}
                            <li data-testid="address_book__link">
                              <Link to={appPaths.addressBookUrl}>
                                Mis direcciones
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
                        className="main-menu__icon main-menu__login"
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
              <li
                className="main-menu__search"
                onClick={() =>
                  overlayContext.show(OverlayType.search, OverlayTheme.center)
                }
              >
                <ReactSVG path={searchImg} />
              </li>
              <Online>
                <li
                  className="main-menu__icon main-menu__cart"
                  onClick={() => {
                    overlayContext.show(OverlayType.cart, OverlayTheme.right);
                  }}
                >
                  <ReactSVG path={cartImg} />
                  {cartItemsQuantity > 0 ? (
                    <span className="main-menu__cart__quantity">
                      {cartItemsQuantity}
                    </span>
                  ) : null}
                </li>
              </Online>
              <Offline>
                <li className="main-menu__offline">
                  <Media
                    query={{ minWidth: mediumScreen }}
                    render={() => <span>Offline</span>}
                  />
                </li>
              </Offline>
            </ul>
          </div>
        </nav>
      )}
    </OverlayContext.Consumer>
  );
};

export default MainMenu;
