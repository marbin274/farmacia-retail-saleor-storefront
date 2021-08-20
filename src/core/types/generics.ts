export type SwapTypesToStrings<T> = {
  [k in keyof T]: string;
};
