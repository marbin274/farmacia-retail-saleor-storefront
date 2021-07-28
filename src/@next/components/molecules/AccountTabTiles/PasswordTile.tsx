import React from "react";

import { Attribute, Tile } from "@components/atoms";

import { usePasswordChange } from "@sdk/react";
import { PasswordChangeForm } from "./PasswordChangeForm";
import * as S from "./styles";
import { Button, PencilIcon } from "@farmacia-retail/farmauna-components";

export const PasswordTile: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [setPasswordChange, { data, error }] = usePasswordChange();

  React.useEffect(() => {
    if (data && !error) {
      setIsEditing(false);
    }
  }, [data, error]);
  return (
    <S.TileWrapper>
      <Tile>
        <S.Wrapper className="fa-pt-8 fa-px-2 fa-pb-2">
          <S.Header className="my_data">
            <span className="fa-text-2xl fa-font-semibold">Mi contraseña</span>
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
            {isEditing ? (
              <PasswordChangeForm
                handleSubmit={data => {
                  setPasswordChange(data);
                }}
                hide={() => {
                  setIsEditing(false);
                }}
                error={error ? error!.extraInfo!.userInputErrors : []}
              />
            ) : (
              <Attribute
                description="Contraseña"
                attributeValue="**************"
              />
            )}
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
