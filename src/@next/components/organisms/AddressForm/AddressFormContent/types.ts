import { IAddressWithEmail } from "@temp/@next/types";

export interface IFieldsProps {
    fieldErrors: any;
    required?: boolean;
    values: IAddressWithEmail | undefined;
    basicInputProps: any;
}
export interface IProps {
    fieldsProps: IFieldsProps
}

export interface ISelectFieldsProps {
    cities: any[];
    fieldErrors: any;
    values: IAddressWithEmail | undefined;
    handleCityChange?: any;
}
export interface ISelectProps {
    fieldsProps: ISelectFieldsProps
}