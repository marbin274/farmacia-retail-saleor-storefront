import { Button } from "@app/components/atoms";
import { IFormError } from "@app/types";
import { joinFormikErrorsToIFormErrorsAndConvertToObjectErrors } from "@app/utils/errorsManagement";
import { TextField } from "@components/molecules";
import { LocalRepository } from "@temp/@sdk/repository";
import { passwordResetUrl, resetPasswordMailSentUrl } from "@temp/app/routes";
import { useFormik } from "formik";
import React from "react";
import { MutationFn } from "react-apollo";
import { useHistory } from "react-router-dom";
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

    const history = useHistory();
    const localRepository = new LocalRepository();

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
    React.useEffect(() => {
        if (showMessageSuccess) {
            localRepository.setResetPasswordEmail(values.email);
            history.push(resetPasswordMailSentUrl);
        }
    }, [showMessageSuccess]);

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
            inputWrapperClassname="password-reset-form__input-wrapper"
        />
        {children}
        <div className="password-reset-form__button">
            <Button type="submit" {...(loading && { disabled: true })}>
                {loading ? "Cargando" : "Enviar instrucciones"}
            </Button>
        </div>
    </form>;
}

export default ResetPasswordFormContent;
