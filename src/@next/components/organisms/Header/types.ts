import { INavItem } from '@components/organisms/MobileNav';

export interface IProps {
  categories: INavItem[];
  collections: INavItem[];
  hideMenuCondition: boolean;
  isLightHeader: boolean;
}
