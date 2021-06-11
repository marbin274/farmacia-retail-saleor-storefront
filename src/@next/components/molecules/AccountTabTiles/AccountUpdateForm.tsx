import { Formik } from "formik";
import React from "react";
import { TextField } from "../TextField";
import { Button } from "@farmacia-retail/farmauna-components";
import { Attribute } from "@components/atoms";
import * as S from "./styles";
import { UserDetails_me } from "@temp/@sdk/queries/gqlTypes/UserDetails";

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
  user,
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
            <S.Form onSubmit={handleSubmit}>
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
                <S.AttributeWrapper>
                  <Attribute
                    description="Correo"
                    attributeValue={(user && user.email) || "-"}
                  />
                </S.AttributeWrapper>
                <S.AttributeWrapper>
                  <Attribute
                    description="Número de documento"
                    attributeValue={(user && user.documentNumber) || "-"}
                  />
                </S.AttributeWrapper>
              </S.ContentEditOneLine>
              <S.FormButtons>
                <Button type="button" variant="outline" onClick={hide}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting || !isValid}>
                  Guardar
                </Button>
              </S.FormButtons>
            </S.Form>
          );
        }}
      </Formik>
    </>
  );
};
