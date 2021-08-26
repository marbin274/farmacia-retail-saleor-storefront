import React from 'react';
import { Attribute } from '@components/atoms';
import { usePasswordChange } from '@sdk/react';
import { PasswordChangeForm } from './PasswordChangeForm';
import * as S from './styles';
import { Button } from '@farmacia-retail/farmauna-components';

interface IPasswordTileProps {
  startFocusPassword(): void;
  stopFocusPassword(): void;
  notifyRequestSuccess(): void;
}

export const PasswordTile: React.FC<IPasswordTileProps> = ({
  startFocusPassword,
  stopFocusPassword,
  notifyRequestSuccess,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [setPasswordChange, { data, error }] = usePasswordChange();

  React.useEffect(() => {
    if (data && !error) {
      notifyRequestSuccess();
      setTimeout(() => {
        setIsEditing(false);
      }, [1500]);
    }
  }, [data, error]);

  React.useEffect(() => {
    if (isEditing) {
      startFocusPassword();
    } else {
      stopFocusPassword();
    }
  }, [isEditing]);

  return (
    <div
      className={`fa-rounded-2xl ${
        isEditing ? 'fa-bg-white' : 'fa-bg-neutral-light fa-p-4'
      }`}
    >
      <div className="fa-flex text-center fa-p-0">
        <S.Content>
          {isEditing ? (
            <PasswordChangeForm
              handleSubmit={(data) => {
                setPasswordChange(data);
              }}
              hide={() => {
                setIsEditing(false);
              }}
              error={error ? error!.extraInfo!.userInputErrors : []}
            />
          ) : (
            <div className="fa-flex flex-row fa-justify-between fa-w-full fa-items-end">
              <Attribute description="Contraseña" attributeValue="**********" />
              {!isEditing && (
                <Button
                  size="small"
                  variant="outline"
                  role="edit-password-option"
                  className="fa-ml-4"
                  onClick={() => setIsEditing((isEditing) => !isEditing)}
                >
                  Cambiar
                </Button>
              )}
            </div>
          )}
        </S.Content>
      </div>
    </div>
  );
};
