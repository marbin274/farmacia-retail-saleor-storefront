import { Formik } from 'formik';
import React from 'react';
import { TextField } from '../TextField';
import { Button } from '@farmacia-retail/farmauna-components';
import * as S from './styles';
import { UserDetails_me } from '@temp/@sdk/queries/gqlTypes/UserDetails';

type IProps = {
  handleSubmit: (data: any) => void;
  hide: () => void;
  initialValues: {
    firstName: string;
    lastName: string;
  };
  user: UserDetails_me | null;
};

export const AccountUpdateForm: React.FC<IProps> = ({
  handleSubmit,
  hide,
  initialValues,
}) => {
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit({
            firstName: values.firstName,
            lastName: values.lastName,
          });
          setSubmitting(false);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          isSubmitting,
          isValid,
        }) => {
          return (
            <form
              onSubmit={handleSubmit}
              className="fa-w-full"
              role="account-form"
            >
              <div className="fa-text-black fa-text-base fa-mb-4 fa-font-bold">
                Datos Personales
              </div>
              <S.ContentEditOneLine>
                <S.ContentExtendInput>
                  <TextField
                    name="firstName"
                    label="Nombres"
                    type="text"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </S.ContentExtendInput>
                <S.ContentExtendInput>
                  <TextField
                    name="lastName"
                    label="Apellidos"
                    type="text"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </S.ContentExtendInput>
              </S.ContentEditOneLine>
              <S.FormButtons>
                <Button type="button" variant="outline" onClick={hide}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting || !isValid}>
                  Guardar
                </Button>
              </S.FormButtons>
            </form>
          );
        }}
      </Formik>
    </>
  );
};
