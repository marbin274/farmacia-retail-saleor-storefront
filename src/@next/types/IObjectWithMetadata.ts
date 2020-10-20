export interface IMetadataItem {
  key: string;
  value: string;
}

export interface IObjectWithMetadata {
  privateMetadata?: IMetadataItem[];
  metadata?:  IMetadataItem[];
}
