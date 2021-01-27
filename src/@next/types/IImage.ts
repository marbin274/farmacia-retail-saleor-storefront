import React from "react";

export interface IImage {
  url?: string | null;
  url2x?: string | null;
  alt?: string | null;
  children?: React.ReactElement;
  defaultImage?: string;
}
