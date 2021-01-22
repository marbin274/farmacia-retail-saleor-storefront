import { Button } from "@app/components/atoms";
import { IFormError } from "@app/types";
import { joinFormikErrorsToIFormErrorsAndConvertToObjectErrors } from "@app/utils/errorsManagement";
import { TextField } from "@components/molecules";
import { passwordResetUrl } from "@temp/app/routes";
import { useFormik } from "formik";
import React from "react";
import { MutationFn } from "react-apollo";
import { ResetPassword, ResetPasswordVariables } from "./gqlTypes/ResetPassword";
import { passwordResetFormSchema } from "./passwordResetForm.schema";

interface ResetPasswordFormContentProps {
    called: boolean;
    loading: boolean;
    errors?: IFormError[],
    passwordReset: MutationFn<ResetPassword, ResetPasswordVariables>;
}
const initialValues: ResetPasswordVariables = {
    email: '',
    redirectUrl: `${window.location.origin}${passwordResetUrl}`,
};
const ResetPasswordFormContent: React.FC<ResetPasswordFormContentProps> = ({ called, loading, errors: requestErrors, children, passwordReset }) => {

    const [showMessageSuccess, setShowMessageSuccess] = React.useState<boolean>(false);
    const [showMessageErrors, setShowMessageErrors] = React.useState<boolean>(false);
    const { handleSubmit, handleChange, handleBlur, touched, errors: formikErrors, values } = useFormik<ResetPasswordVariables>({
        initialValues,
        onSubmit: values => {
            passwordReset({ variables: values });
        },
        validationSchema: passwordResetFormSchema,
    });

    const changeShowMessages = (show: boolean) => {
        setShowMessageErrors(show);
        setShowMessageSuccess(show);
    }

    React.useEffect(() => {
        if (called && !loading) {
            const hasErrors = requestErrors && requestErrors.length > 0;
            setShowMessageErrors(called && hasErrors);
            setShowMessageSuccess(called && !hasErrors && loading === false);
        } else {
            changeShowMessages(false);
        }
    }, [loading]);

    const errors = joinFormikErrorsToIFormErrorsAndConvertToObjectErrors(formikErrors, requestErrors, touched, showMessageErrors);

    return <form onSubmit={handleSubmit}>
        <TextField
            autoComplete="email"
            placeholder="Ejemplo: juanperez@mail.com"
            errors={errors!.email}
            label="Correo"
            name="email"
            type="text"
            value={!values?.email ? "" : values?.email}
            onBlur={(e) => { changeShowMessages(false); handleBlur(e); }}
            onChange={(e) => { changeShowMessages(false); handleChange(e); }}
        />
        {children}
        {showMessageSuccess ? <p><strong>Revise su correo electrónico</strong></p> : <></>}
        <div className="password-reset-form__button">
            <Button type="submit" {...(loading && { disabled: true })}>
                {loading ? "Cargando" : "Enviar instrucciones"}
            </Button>
        </div>
    </form>;
}

export default ResetPasswordFormContent;
