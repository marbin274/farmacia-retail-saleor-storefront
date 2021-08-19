import React from 'react';
import { useAccountUpdate, useUserDetails } from '@sdk/react';
import { Attribute, Tile } from '@components/atoms';
import { AccountUpdateForm } from './AccountUpdateForm';
import * as S from './styles';
import { Button } from '@farmacia-retail/farmauna-components';
import { PasswordTile } from './PasswordTile';

interface IAccountTitleProps {
  startFocusAccount(): void;
  stopFocusAccount(): void;
}

export const AccountTile: React.FC<IAccountTitleProps> = ({
  startFocusAccount,
  stopFocusAccount,
}) => {
  const [isFocusPassword, setIsFocusPassword] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [setAccountUpdate, { data, error }] = useAccountUpdate();
  const { data: user } = useUserDetails();

  React.useEffect(() => {
    if (data && !error) {
      setIsEditing(false);
    }
  }, [data, error]);

  React.useEffect(() => {
    if (isEditing) {
      startFocusAccount();
    } else {
      stopFocusAccount();
    }
  }, [isEditing]);

  const startFocusPassword = () => {
    startFocusAccount();
    setIsFocusPassword(true);
  };

  const stopFocusPassword = () => {
    stopFocusAccount();
    setIsFocusPassword(false);
  };

  return (
    <S.TileWrapper>
      <Tile>
        <S.Wrapper className="fa-pt-8 fa-px-4 fa-pb-2">
          <S.Content>
            <S.HeaderSmall
              className={`personal_data fa-text-neutral-darkest fa-text-lg ${
                isEditing || isFocusPassword
                  ? 'fa-justify-start'
                  : 'fa-justify-center'
              }`}
            >
              {isFocusPassword && 'Cambiar contraseña'}
              {!isFocusPassword && isEditing && 'Editar mis datos'}
              {!isFocusPassword && !isEditing && 'Mis datos personales'}
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
                {!isFocusPassword && (
                  <>
                    <S.AttributeWrapper>
                      <Attribute
                        description="Nombres completos "
                        role="fullname"
                        attributeValue={
                          `${user?.firstName} ${user?.lastName}` || ''
                        }
                      />
                    </S.AttributeWrapper>

                    <S.AttributeWrapper>
                      <Attribute
                        description="Correo electrónico"
                        role="email"
                        attributeValue={(user && user.email) || '-'}
                      />
                    </S.AttributeWrapper>
                    <S.AttributeWrapper>
                      <Attribute
                        description="Número de documento"
                        role="document"
                        attributeValue={(user && user.documentNumber) || '-'}
                      />
                    </S.AttributeWrapper>
                    <S.AttributeWrapper>
                      {!isEditing && (
                        <Button
                          variant="outline"
                          role="edit-account-option"
                          onClick={() =>
                            setIsEditing((isEditing) => !isEditing)
                          }
                        >
                          Editar mis datos
                        </Button>
                      )}
                    </S.AttributeWrapper>
                  </>
                )}

                <S.AttributeWrapper
                  className={`${isEditing ? 'fa-mt-4' : ''} fa-mb-0`}
                >
                  <PasswordTile
                    startFocusPassword={startFocusPassword}
                    stopFocusPassword={stopFocusPassword}
                  />
                </S.AttributeWrapper>
              </>
            )}
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
