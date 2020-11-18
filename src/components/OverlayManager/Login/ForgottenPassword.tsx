import React from "react";

const ForgottenPassword: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <>
    <div className="login__content__password-reminder">
      <label
        htmlFor="remember"
        className="login__content__password-reminder__remember"
      >
        <input type="checkbox" id="remember" name="remember" value="true" />
        Recordar
      </label>
      <button
        type="button"
        className="login__content__password-reminder__forget"
        onClick={onClick}
      >
        Olvidé mi contraseña
      </button>
    </div>
  </>
);

export default ForgottenPassword;
