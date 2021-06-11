import { INavItem } from "../MobileNav";

export interface IProps{
    categories: INavItem[] | null;
    hideMenuCondition: boolean;
    navMain: INavItem[] | null;
}
