import { icons } from "./definitions";

type IconName = keyof typeof icons;

export interface IProps {
  name: IconName;
  viewPort?: number;
  heightViewPort?: number;
  widthViewPort?: number;
  color?: string | string[];
  size?: number;
}
