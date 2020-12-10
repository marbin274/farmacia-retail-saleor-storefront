export interface IProps {
  product: {
    thumbnail: {
      url?: string | undefined;
      alt?: string | null | undefined;
    } | null;
    thumbnail2x: {
      url?: string | undefined;
    } | null;
  };
  outStock?: boolean;
}
