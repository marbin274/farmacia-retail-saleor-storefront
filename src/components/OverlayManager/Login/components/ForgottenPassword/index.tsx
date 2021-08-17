import { Checkbox } from '@temp/@next/components/atoms';
import React, { useState } from 'react';
import { ButtonForgotPassword } from './styles';

const ForgottenPassword: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  const [isRememberChecked, setIsChecked] = useState(false);
  const toogleChecked = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  return (
    <>
      <div className="fa-flex fa-items-center fa-justify-between fa-ml-2">
        <Checkbox
          parentStyles={{ marginBottom: 0, marginLeft: 0 }}
          name="remember"
          value="true"
          id="remember"
          checked={isRememberChecked}
          onChange={toogleChecked}
        >
          Recordarme
        </Checkbox>
        <ButtonForgotPassword variant="link" type="button" onClick={onClick}>
          Olvidé mi contraseña
        </ButtonForgotPassword>
      </div>
    </>
  );
};

export default ForgottenPassword;
