import { IAddressWithEmail } from "@temp/@next/types";

export interface IFieldsProps {
    fieldErrors: any;
    required?: boolean;
    values: IAddressWithEmail | undefined;
    basicInputProps: any;
    setFieldValue: (field: string, value: string | boolean) => void;
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