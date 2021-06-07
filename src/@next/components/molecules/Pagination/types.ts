export interface IPaginationProps {
    page: number;
    total: number;
    pageSize: number;
    onPageChange?: (page: number) => void;
  };
  
  export interface IProps extends IPaginationProps {
    pageItemsLimit?: number;
    className?: string;
  }
  