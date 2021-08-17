import React from "react";
import { Attribute, Tile } from "@components/atoms";
import { usePasswordChange } from "@sdk/react";
import { PasswordChangeForm } from "./PasswordChangeForm";
import * as S from "./styles";
import { Button } from "@farmacia-retail/farmauna-components";
export const PasswordTile: React.FC = () => {

  const [isEditing, setIsEditing] = React.useState(false);
  const [setPasswordChange, { data, error }] = usePasswordChange();

  React.useEffect(() => {
    if (data && !error) {
      setIsEditing(false);
    }
  }, [data, error]);
  return (
    <S.TileWrapper >
      <Tile className="rounded-md ">
        <S.Wrapper className="fa-flex text-center ">
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
              <div className="fa-flex flex-row fa-justify-between ">
                <Attribute
                  description="Contraseña"
                  attributeValue="**********"
                />
                {!isEditing && (
                  <Button size="small"
                    variant="outline"
                    onClick={() => setIsEditing(isEditing => !isEditing)}>
                    Cambiar
                  </Button>
                )}
              </div>

            )}
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
