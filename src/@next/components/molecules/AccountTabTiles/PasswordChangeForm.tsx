import { Formik } from 'formik';
import React from 'react';
import { TextField } from '../TextField';

import { Button } from '@farmacia-retail/farmauna-components';
import { IFormError } from '@types';
import * as S from './styles';
import { registerFormSchema } from './passwordChange.schema';

export const PasswordChangeForm: React.FC<{
  handleSubmit: (data: any) => void;
  hide: () => void;
  error?: IFormError[];
}> = ({ handleSubmit, hide, error }) => {
  const fieldErrors: any = {};

  if (error) {
    error.map(({ field, message }: { field?: string; message?: string }) => {
      if (field && message) {
        fieldErrors[field] = fieldErrors[field]
          ? [...fieldErrors[field], { message }]
          : [{ message }];
      }
    });
  }
  return (
    <>
      <Formik
        initialValues={{
          confirmPassword: '',
          newPassword: '',
          oldPassword: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit({
            newPassword: values.newPassword,
            oldPassword: values.oldPassword,
          });
          setSubmitting(false);
        }}
        validateOnChange={false}
        validationSchema={registerFormSchema}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
          isSubmitting,
          isValid,
        }) => {
          return (
            <form
              onSubmit={handleSubmit}
              className="fa-text-left"
              role="password-form"
            >
              <S.ContentEditOneLine>
                <S.ContentExtendInput>
                  <TextField
                    name="oldPassword"
                    label="Contraseña actual"
                    type="password"
                    value={values.oldPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    errors={
                      touched.oldPassword && errors.oldPassword
                        ? [{ message: errors.oldPassword }]
                        : undefined || fieldErrors!.oldPassword
                    }
                  />
                </S.ContentExtendInput>
                <S.ContentExtendInput>
                  <TextField
                    name="newPassword"
                    label="Nueva contraseña"
                    type="password"
                    value={values.newPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    errors={
                      touched.newPassword && errors.newPassword
                        ? [{ message: errors.newPassword }]
                        : undefined || fieldErrors!.newPassword
                    }
                  />
                </S.ContentExtendInput>
                <S.ContentExtendInput>
                  <TextField
                    name="confirmPassword"
                    label="Repite la nueva contraseña"
                    type="password"
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    errors={
                      touched.confirmPassword && errors.confirmPassword
                        ? [{ message: errors.confirmPassword }]
                        : undefined || fieldErrors!.confirmPassword
                    }
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
