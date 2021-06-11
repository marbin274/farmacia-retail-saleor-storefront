import { INavItem } from "../MobileNav";

export interface IProps {
  categories: INavItem[] | null;
  hideMenuCondition: boolean;
  isProductPage: boolean;
}
