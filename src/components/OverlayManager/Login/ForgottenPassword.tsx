import { Checkbox } from "@temp/@next/components/atoms";
import { Button } from "@farmacia-retail/farmauna-components";
import React, { useState } from "react";

const ForgottenPassword: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {

  const [isRememberChecked, setIsChecked] = useState(false);
  const toogleChecked = () => {
    setIsChecked(isChecked => !isChecked);
  }

  return (
    <>
      <div className="fa-flex fa-items-center fa-justify-between fa-ml-2">
        <Checkbox
          parentStyles={{ marginBottom: 0, marginLeft: 0 }}
          name='remember'
          value="true"
          id="remember"
          checked={isRememberChecked}
          onChange={toogleChecked}>
          Recordarme
        </Checkbox>
        <Button
          variant="link"
          type="button"
          className="login__content__password-reminder__forget"
          onClick={(onClick)}
        >
          Olvidé mi contraseña
        </Button>
      </div>
    </>
  )
};

export default ForgottenPassword;
