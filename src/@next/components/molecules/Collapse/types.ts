export type ICollapseHeaderProps = {
  title: string;
  active?: boolean;
  onClick?: () => void;
  hasError?: boolean;
};

export type ICollapseProps = {
  header: string;
  active?: boolean;
  onClick?: () => void;
  hasError?: boolean;
};
