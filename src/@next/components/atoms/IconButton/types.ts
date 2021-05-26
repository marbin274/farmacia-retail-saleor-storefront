import { IIconProps } from "../Icon";

export interface IProps extends IIconProps {
  heightViewPort?: number;
  viewPort?: number;
  widthViewPort?: number;
  onClick?: () => void;
}
