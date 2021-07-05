import { INavItem } from "../MobileNav";

export interface IProps {
  categories: INavItem[];
  collections: INavItem[];
  hideMenuCondition: boolean;
  isProductPage: boolean;
}
