import React from "react";
import ReactSVG from "react-svg";
import NavItem, { INavItem } from "./NavItem";
import arrowImg from "../../images/arrow-left.svg";
import { Button } from "@temp/@next/components/atoms";
import { Link} from "react-router-dom";
import { generateCategoryUrl } from "@temp/core/utils";

interface NavItemProps extends INavItem {
    hideOverlay(): void;
    returnMain(): void;
}


export const NavSubItem: React.FC<NavItemProps> = ({
    hideOverlay,
    returnMain,
    ...item
}) => {

    const [openParent, setOpenParent] = React.useState<INavItem | null>(null);


    const handleShowSubItems = (itemName: INavItem) => {
        setOpenParent(itemName);
    };

    return (
        <>
            <li>
                <div className="side-nav__menu-item__subitem-content">
                    <ReactSVG
                        className={"side-nav__menu-item-arrow"}
                        path={arrowImg}
                        onClick={returnMain}
                    />
                    <span>{item.name}</span>
                </div>
            </li>
            {
                item.children.map((item) => (
                    <NavItem
                        key={item.id}
                        hideOverlay={hideOverlay}
                        showSubItems={handleShowSubItems}
                        arrowDirection="down"
                        isOpen={openParent?.name === item.name}
                        {...item}
                    />
                ))
            }
            <li className="side-nav__menu-item__subitem-button">
                <Link to={generateCategoryUrl(item.id, item.name)}>
                    <Button>Ver todos</Button>
                </Link>
            </li>
        </>
    );
}
