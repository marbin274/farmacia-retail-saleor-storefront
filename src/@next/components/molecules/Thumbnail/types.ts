export interface IProps {
  children?: any;
  hasMagnifier?: boolean;
  height?: number;
  source: {
    thumbnail: { url?: string; alt?: string | null } | null;
    thumbnail2x: { url?: string } | null;
  };
  noPhotoDefault?: boolean;
  width?: number;
}
