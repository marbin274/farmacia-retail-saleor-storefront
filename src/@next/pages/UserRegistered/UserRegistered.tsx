import React, { useEffect, useState } from "react";
import ReactSVG from "react-svg";
import letterImg from "images/auna/reset-password-mail-sent.svg";
import "./scss/index.scss";
import { useHistory } from "react-router";
import { Button } from "@farmacia-retail/farmauna-components";
/**
 * Thank you page after completing the checkout.
 */
const UserRegistered: React.FC<any> = ({}: any) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  useEffect(() => {
    const userEmail = sessionStorage.getItem("user-registered-email") || null;
    if (userEmail) {
      setEmail(userEmail);
    } else {
      history.push("/login");
    }
    sessionStorage.removeItem("user-registered-email");
  }, []);
  return (
    <div className="register_successfully">
      <div className="register_header">
        <ReactSVG path={letterImg} />
      </div>
      <div className="register_title">
        <p>Revisa tu correo electrónico</p>
      </div>
      <div className="register_body">
        <p>
        Hemos enviado las instrucciones para que<br/> puedas restaurar la contraseña a <br/>
          <strong>{email}</strong>
        </p>
      </div>
      <div className="register_button">
        <Button type="button" variant="default"
          onClick={() => {
            history.push("/login");
          }}
        >
          Entendido
        </Button>
      </div>
    </div>
  );
};

export { UserRegistered };

