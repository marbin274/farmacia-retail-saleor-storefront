import { INavItem } from '@components/organisms/MobileNav';

export interface IProps {
  categories: INavItem[] | null;
  hideMenuCondition: boolean;
  navMain: INavItem[] | null;
  isLightHeader: boolean;
  hideMenuConditionMobile: boolean;
}
