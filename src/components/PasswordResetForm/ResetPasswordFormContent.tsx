import { IFormError } from "@app/types";
import { joinFormikErrorsToIFormErrorsAndConvertToObjectErrors } from "@app/utils/errorsManagement";
import { LocalRepository } from "@temp/@sdk/repository";
import { passwordResetUrl } from "@temp/app/routes";
import { useFormik } from "formik";
import React from "react";
import { MutationFn } from "react-apollo";
import { ResetPassword, ResetPasswordVariables } from "./gqlTypes/ResetPassword";
import { passwordResetFormSchema } from "./passwordResetForm.schema";
import { Button, InputField } from "@farmacia-retail/farmauna-components";
import { ResetPasswordMailSent } from "@temp/views/Account";

interface ResetPasswordFormContentProps {
    called: boolean;
    loading: boolean;
    errors?: IFormError[],
    onClose: () => void;
    passwordReset: MutationFn<ResetPassword, ResetPasswordVariables>;
}

const initialValues: ResetPasswordVariables = {
    email: '',
    redirectUrl: `${window.location.origin}${passwordResetUrl}`,
};
const ResetPasswordFormContent: React.FC<ResetPasswordFormContentProps> = ({ onClose, called, loading, errors: requestErrors, children, passwordReset }) => {
    const [showMessageSuccess, setShowMessageSuccess] = React.useState<boolean>(false);
    const [showMessageErrors, setShowMessageErrors] = React.useState<boolean>(false);

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
        if (document.querySelector<HTMLElement>('.overlay__header')) {
            document.querySelector<HTMLElement>('.overlay__header').style.display = 'block';
        }
    }, []);

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
            setOpen(!open);
        }
    }, [showMessageSuccess]);

    const errors = joinFormikErrorsToIFormErrorsAndConvertToObjectErrors(formikErrors, requestErrors, touched, showMessageErrors);

    const [open, setOpen] = React.useState<boolean>(true);

    return (

        <>
            { open ? (
                <>
                    <p className="fa-my-6">
                        Ingresa tu dirección de correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña
                    </p>
                    <form onSubmit={handleSubmit}>

                        <InputField
                            autoComplete="email"
                            placeholder="Ejemplo: juanperez@mail.com"
                            error={!!errors?.email ? errors!.email[0].message : ''}
                            label="Correo electrónico"
                            name="email"
                            type="text"
                            value={!values?.email ? "" : values?.email}
                            onBlur={(e) => { changeShowMessages(false); handleBlur(e); }}
                            onChange={(e) => { changeShowMessages(false); handleChange(e); }}
                            className="password-reset-form__input-wrapper"
                        />
                        {children}
                        <div className="password-reset-form__button">

                            <Button type="submit" {...(loading && { disabled: true })} variant="default">
                                {loading ? "Cargando" : "Enviar instrucciones"}
                            </Button>
                        </div>
                    </form>
                </>
            ) : (

                <div>
                    <ResetPasswordMailSent onClose={onClose} />
                </div>
            )
            }
        </>

    )


}

export default ResetPasswordFormContent;
