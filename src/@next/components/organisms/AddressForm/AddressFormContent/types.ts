import { IAddressWithEmail } from "@temp/@next/types";

export interface IFieldsProps {
    fieldErrors: any;
    required?: boolean;
    values: IAddressWithEmail | undefined;
    onChange: React.ChangeEventHandler<HTMLInputElement> | any | undefined;
    onBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
    setFieldValue: (field: string, value: string | boolean) => void;
}
export interface IProps {
    fieldsProps: IFieldsProps
}

export interface ISelectFieldsProps {
    cities: any[];
    fieldErrors: any;
    values: IAddressWithEmail | undefined;
    handleChange?: any;
    handleBlur: any;
}
export interface ISelectProps {
    fieldsProps: ISelectFieldsProps
}