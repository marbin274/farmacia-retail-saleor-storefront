import { IFormError } from "@temp/@next/types";
import { RegisterAccountVariables } from "./gqlTypes/RegisterAccount";

export interface IProps {
    loading: boolean;
    errors?: IFormError[];
    registerCustomer: (params : {variables: RegisterAccountVariables})=>void;
    setEmail?: (email: string) => void;
  }

export interface ILoginForm extends RegisterAccountVariables{
    confirmPassword?: string;
}
