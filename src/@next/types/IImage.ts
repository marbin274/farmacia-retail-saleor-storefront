import React from "react";

export interface IImage {
  url?: string | null;
  url2x?: string | null;
  alt?: string;
  children?: React.ReactElement;
  defaultImage?: string;
}
