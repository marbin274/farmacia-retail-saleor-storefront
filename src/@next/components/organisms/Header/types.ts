import { INavItem } from '@temp/components/MobileNav';

export interface IProps {
  categories: INavItem[];
  collections: INavItem[];
  hideMenuCondition: boolean;
  isLightHeader: boolean;
}
