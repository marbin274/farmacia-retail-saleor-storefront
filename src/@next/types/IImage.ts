import React from "react";

export interface IImage {
  alt?: string | null;
  children?: React.ReactElement;
  defaultImage?: string;
  height?: number;
  url?: string | null;
  url2x?: string | null;
  width?: number;
}
