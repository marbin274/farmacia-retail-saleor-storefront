export interface IFormError {
  message: string;
  field?: string;
}

export interface IFormErrorSort extends IFormError {
  sort?: number;
}
