import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { useUserDetails } from "@sdk/react";
import { Offline, OfflinePlaceholder, Online, OverlayContext } from "..";
import { checkoutUrl } from "src/app/routes/paths";
import "./scss/index.scss";
import CheckoutAsGuest from "./CheckoutAsGuest";
// TODO: use it as soon as we need the registration process
import ResetPasswordForm from "./ResetPasswordForm";
import SignInForm from "./SignInForm";

const CheckoutLogin: React.FC<{}> = () => {
  const [resetPassword, setResetPassword] = useState(false);
  const overlay = useContext(OverlayContext);
  const { data: user } = useUserDetails();
  if (user) {
    return <Redirect to={checkoutUrl} />;
  }
  return (
    <div className="checkout-login-container">
      <div className="checkout-login-container__right" />
      <div className="container">
        <Online>
          <div className="checkout-login">
            <div className="checkout-login__user">
              {resetPassword ? (
                <ResetPasswordForm
                  onClick={() => {
                    setResetPassword(false);
                  }}
                />
              ) : (
                <SignInForm
                  onClick={() => {
                    setResetPassword(true);
                  }}
                />
              )}
            </div>
            <CheckoutAsGuest overlay={overlay} checkoutUrl={checkoutUrl} />
          </div>
        </Online>
        <Offline>
          <OfflinePlaceholder />
        </Offline>
      </div>
    </div>
  );
};

export default CheckoutLogin;
