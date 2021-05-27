import { useCart, useSignOut, useUserDetails } from "@sdk/react";
import { useUpdateCartLines } from "@temp/@next/hooks/useUpdateCartLines";
import { removePaymentItems } from "@temp/@next/utils/checkoutValidations";
import * as appPaths from "@temp/app/routes";
import { baseUrl } from "@temp/app/routes/paths";
import { maybe } from "@temp/core/utils";
import cartImg from "images/cart.svg";
import hamburgerImg from "images/hamburger.svg";
import logoImg from "images/logo.svg";
import searchImg from "images/search.svg";
import userImg from "images/user.svg";
import React from "react";
import Media from "react-media";
import { Link, useLocation } from "react-router-dom";
import ReactSVG from "react-svg";
import {
  MenuDropdown,
  Offline,
  Online,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "..";
import {
  mediumScreen,
  smallScreen,
} from "../../globalStyles/scss/variables.scss";
import NavDropdown from "./NavDropdown";
import { TypedMainMenuQuery } from "./queries";
import "./scss/index.scss";

const MainMenu: React.FC = () => {
  const { data: user } = useUserDetails();
  const location = useLocation();
  const [signOut] = useSignOut();
  const { items } = useCart();
  const { update: updateCartLines } = useUpdateCartLines();

  const mediumScreenPlusOne = "993px";

  const handleSignOut = () => {
    signOut();
  };

  const cartItemsQuantity =
    (items &&
      items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) ||
    0;
  const hideMenuCondition = !(location.pathname.includes("checkout") || location.pathname.includes("order-finalized"));
  
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
                    {hideMenuCondition ? (
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
                            {hideMenuCondition ? (
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
                            ) : (
                              <></>
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
            {hideMenuCondition ? (
              <TypedMainMenuQuery renderOnError displayLoader={false}>
                {({ data }) => {
                  const items = maybe(
                    () => data.shop.navigation.main.items,
                    []
                  );

                  return (
                    <ul>
                      <Media
                        query={{ minWidth: mediumScreenPlusOne }}
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
            ) : (
              <> </>
            )}

            {hideMenuCondition ? (
              <Media
                query={{ maxWidth: mediumScreen }}
                render={() => (
                  <Link
                    onClick={removePaymentItems}
                    to={appPaths.baseUrl}
                    className="main-menu__center--icon"
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

          {hideMenuCondition ? (
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
                {(location.pathname !== baseUrl && !location.pathname.includes("search")) && (
                  <li
                    className="main-menu__search"
                    onClick={() =>
                      overlayContext.show(
                        OverlayType.search,
                        OverlayTheme.center
                      )
                    }
                  >
                    <ReactSVG path={searchImg} />
                  </li>
                )
                }
                <Online>
                  <li
                    className="main-menu__icon main-menu__cart"
                    onClick={() => {
                      updateCartLines();
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
          ) : (
            <></>
          )}
        </nav>
      )}
    </OverlayContext.Consumer>
  );
};

export default MainMenu;
