import { ResetPasswordForm } from "@components/molecules";
import { setAuthToken } from "@sdk/auth";
import { useSetPassword, useUserDetails } from "@sdk/react";
import { Button } from "@temp/@next/components/atoms";
import { BASE_URL } from "@temp/core/config";
import { Formik } from "formik";
import resetPasswordChangedIcon from 'images/auna/reset-password-changed.svg';
import React from "react";
import ReactSVG from "react-svg";
import { StringParam, useQueryParams } from "use-query-params";
import { passwordResetSchema } from "./PasswordReset.schema";
import './scss/index.scss';
import * as S from "./styles";
import { FormikProps, IProps } from "./types";


const initialData: FormikProps = {
  password: "",
  retypedPassword: "",
};

export const PasswordReset: React.FC<IProps> = ({ history }: IProps) => {
  const [query] = useQueryParams({
    email: StringParam,
    token: StringParam,
  });
  const { data: user } = useUserDetails();
  const [tokenError, setTokenError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState("");
  const [showPasswordMessageChanged, setShowPasswordMessageChanged] = React.useState<boolean>(false);

  const [setPassword, { data, error: graphqlErrors, loading }] = useSetPassword();

  const { email, token } = query;

  if (!email || !token) {
    history.push(BASE_URL);
  }

  const onSubmit = (values: FormikProps) => {
    if (email && token && values.password) {
      setPassword({
        email,
        password: values.password,
        token,
      });
    }
  };

  const handleClickGoHome = () => {
    history.push(BASE_URL);
  }


  React.useEffect(() => {
    if (data && data.setPassword && data.setPassword.token) {
      setAuthToken(data.setPassword.token);
      setShowPasswordMessageChanged(true);
    }
    if (
      graphqlErrors &&
      graphqlErrors.extraInfo &&
      graphqlErrors.extraInfo.userInputErrors
    ) {
      graphqlErrors.extraInfo.userInputErrors.filter(error => {
        error.field === "token" ? setTokenError(true) : setTokenError(false);
        error.field === "password"
          ? setPasswordError(error.message)
          : setPasswordError("");
      });
    }
  }, [data, graphqlErrors]);

  return (
    <S.Wrapper>
      { showPasswordMessageChanged ?
        <div className="password-changed-confirm">
          <ReactSVG path={resetPasswordChangedIcon} />
          <br />
          <br />
          <p><strong>{user ? user.firstName : "Hola"},</strong> se cambió con éxito tu nueva contraseña</p>
          <div className="password-changed-confirm__button">
            <Button onClick={handleClickGoHome}>Entendido</Button>
          </div>
        </div> :
        <Formik
          initialValues={initialData}
          validationSchema={passwordResetSchema}
          onSubmit={onSubmit}
        >
          {({ handleChange, handleBlur, values, errors, handleSubmit }) => {
            return (
              <ResetPasswordForm
                {...{
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  loading,
                  passwordError,
                  tokenError,
                  values,
                }}
              />
            );
          }}
        </Formik>
      }
    </S.Wrapper>
  );
};
