import React from "react";

import { useAccountUpdate, useUserDetails } from "@sdk/react";

import { Attribute, Tile } from "@components/atoms";

import { AccountUpdateForm } from "./AccountUpdateForm";
import * as S from "./styles";
import { Button, PencilIcon } from "@farmacia-retail/farmauna-components";

export const AccountTile: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [setAccountUpdate, { data, error }] = useAccountUpdate();
  const { data: user } = useUserDetails();

  React.useEffect(() => {
    if (data && !error) {
      setIsEditing(false);
    }
  }, [data, error]);
  return (
    <S.TileWrapper>
      <Tile>
        <S.Wrapper className="wrapper_background_account">
          <S.Header className="my_data">
            Mis datos
            {!isEditing && (
              <Button
                icon={<PencilIcon />}
                iconOnly={true}
                size="small"
                onClick={() => setIsEditing(isEditing => !isEditing)}
              />

            )}
          </S.Header>
          <S.Content>
            <S.HeaderSmall className="personal_data">
              Datos personales
            </S.HeaderSmall>
            {isEditing ? (
              <AccountUpdateForm
                initialValues={{
                  firstName: (user && user.firstName) || "",
                  lastName: (user && user.lastName) || "",
                }}
                handleSubmit={data => {
                  setAccountUpdate({ input: data });
                }}
                hide={() => {
                  setIsEditing(false);
                }}
                user={user}
              />
            ) : (
              <S.ContentOneLine>
                <S.AttributeWrapper>
                  <Attribute
                    description="Nombres"
                    attributeValue={(user && user.firstName) || "-"}
                  />
                </S.AttributeWrapper>
                <S.AttributeWrapper>
                  <Attribute
                    description="Apellidos"
                    attributeValue={(user && user.lastName) || "-"}
                  />
                </S.AttributeWrapper>
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
              </S.ContentOneLine>
            )}
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
