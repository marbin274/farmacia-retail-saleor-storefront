import classNames from "classnames";
import * as React from "react";

import {
  NavLink,
  OverlayContextInterface,
} from "..";
import { MainMenu_shop_navigation_main_items } from "@temp/components/MainMenu/gqlTypes/MainMenu";

import "./scss/index.scss";

class NavDropdown extends React.PureComponent<
  MainMenu_shop_navigation_main_items & { overlay: OverlayContextInterface },
  { active: boolean }
> {
  state = { active: false };

  get hasSubNavigation() {
    const { children } = this.props;
    return children ;
  }

  showOverlayHandler = () => {
    // TODO: CHECK BEHAVIOR WITH DESIGNER
    // if (this.hasSubNavigation) {
    //   this.setState({ active: true });
    //   this.props.overlay.show(OverlayType.mainMenuNav, OverlayTheme.modal);
    // }
  };

  hideOverlayHandler = () => {
    // TODO: CHECK BEHAVIOR WITH DESIGNER
    // if (this.state.active) {
    //   this.props.overlay.hide();
    //   this.setState({ active: false });
    // }
  };

  render() {

    const { active } = this.state;
    const showDropDown = active && this.hasSubNavigation;

    return (
      <ul
        className={classNames({
          "main-menu__nav-dropdown": true,
          "main-menu__nav-dropdown--active": showDropDown,
        })}
        onMouseOver={this.showOverlayHandler}
        onMouseLeave={this.hideOverlayHandler}
      >
        <li>
          <NavLink item={this.props} onClick={this.hideOverlayHandler} />
        </li>
        <li
          className={classNames({
            "main-menu__nav-dropdown__body": true,
            "main-menu__nav-dropdown__body--visible": showDropDown,
          })}
        >
        </li>
      </ul>
    );
  }
}

export default NavDropdown;
