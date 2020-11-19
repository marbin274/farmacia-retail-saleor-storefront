import "./scss/index.scss";
import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { baseUrl } from "../../app/routes";
import NavItem, { INavItem } from "./NavItem";
import logoImg from "../../images/logo.svg";
import closeImg from "../../images/close-circle.svg";

interface NavListProps {
  items: INavItem[];
  hideOverlay(): void;
}

interface NavListState {
  displayedItems: INavItem[];
  openParent: string;
}

class NavList extends React.PureComponent<NavListProps, NavListState> {
  state: NavListState = {
    displayedItems: this.props.items,
    openParent: "",
  };

  handleShowSubItems = (itemName: string) => {
    this.setState({ openParent: itemName });
  };

  render() {
    const { hideOverlay } = this.props;
    const { displayedItems } = this.state;

    return (
      <ul>
        <li className="side-nav__menu-item-header">
          <Link to={baseUrl} onClick={hideOverlay}>
            <ReactSVG path={logoImg} />
          </Link>
          <ReactSVG
            path={closeImg}
            className="side-nav__menu-item-close"
            onClick={hideOverlay}
          />
        </li>
        <li className="side-nav__menu-item--static">Categorías</li>
        {displayedItems.map(item => (
          <NavItem
            key={item.id}
            hideOverlay={hideOverlay}
            showSubItems={this.handleShowSubItems}
            isOpen={this.state.openParent === item.name}
            {...item}
          />
        ))}
      </ul>
    );
  }
}

export default NavList;
