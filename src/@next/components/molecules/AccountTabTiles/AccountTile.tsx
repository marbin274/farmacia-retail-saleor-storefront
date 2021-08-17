import React from 'react';
import { useAccountUpdate, useUserDetails } from '@sdk/react';
import { Attribute, Tile } from '@components/atoms';
import { AccountUpdateForm } from './AccountUpdateForm';
import * as S from './styles';
import { Button } from '@farmacia-retail/farmauna-components';
import { PasswordTile } from './PasswordTile';

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
        <S.Wrapper className="fa-pt-8 fa-px-2 fa-pb-2">
          <S.Content>
            <S.HeaderSmall className="personal_data fa-justify-center">
              Mis datos personales
            </S.HeaderSmall>
            {isEditing ? (
              <AccountUpdateForm
                initialValues={{
                  firstName: (user && user.firstName) || '',
                  lastName: (user && user.lastName) || '',
                }}
                handleSubmit={(data) => {
                  setAccountUpdate({ input: data });
                }}
                hide={() => {
                  setIsEditing(false);
                }}
                user={user}
              />
            ) : (
              <>
                <S.AttributeWrapper>
                  <Attribute
                    description="Nombres completos "
                    attributeValue={
                      `${user?.firstName} ${user?.lastName}` || ''
                    }
                  />
                </S.AttributeWrapper>

                <S.AttributeWrapper>
                  <Attribute
                    description="Correo"
                    attributeValue={(user && user.email) || '-'}
                  />
                </S.AttributeWrapper>
                <S.AttributeWrapper>
                  <Attribute
                    description="Número de documento"
                    attributeValue={(user && user.documentNumber) || '-'}
                  />
                </S.AttributeWrapper>
                <S.AttributeWrapper>
                  {!isEditing && (
                    <Button
                      size="small"
                      variant="outline"
                      onClick={() => setIsEditing((isEditing) => !isEditing)}
                    >
                      Editar mis datos
                    </Button>
                  )}
                </S.AttributeWrapper>
                <S.AttributeWrapper className="fa-mt-4 fa-mb-0">
                  <PasswordTile />
                </S.AttributeWrapper>
              </>
            )}
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
