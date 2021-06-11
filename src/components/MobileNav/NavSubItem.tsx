import React from "react";
import NavItem, { INavItem } from "./NavItem";
import { BackIcon } from "@farmacia-retail/farmauna-components";

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
                <div onClick={returnMain} className="fa-cursor-pointer fa-text-highlight-darkest fa-bg-white fa-text-xs fa-font-medium fa-px-6 fa-py-6 fa-flex fa-items-center">
                    <BackIcon className='fa-mr-2' />
                    <span>Categorías</span>
                </div>
            </li>
            <li>
                <div className="fa-text-highlight-dark fa-text-base fa-font-semibold fa-p-6 fa-flex fa-items-center">
                    <span>{item.name}</span>
                </div>
            </li>
            {
                item.children.map((item) => (
                    <NavItem
                        key={item.id}
                        firstLevel={false}
                        hideOverlay={hideOverlay}
                        showSubItems={handleShowSubItems}
                        arrowDirection="down"
                        isOpen={openParent?.name === item.name}
                        {...item}
                    />
                ))
            }
        </>
    );
}
