export interface IProps {
  source: {
    thumbnail: { url?: string; alt?: string | null } | null;
    thumbnail2x: { url?: string } | null;
  };
  noPhotoDefault?: boolean;
  hasMagnifier?: boolean;
  children?: any;
}
