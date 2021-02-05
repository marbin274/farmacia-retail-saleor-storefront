import { Overlay } from "@components/organisms";
import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import * as S from "./styles";
import ReactSVG from "react-svg";
import { alertService } from "./AlertService";
import { useHistory } from "react-router";

export const Alert: React.FC<any> = () => {
  const history = useHistory();
  const [alert, setAlert] = useState({
    buttonText: "",
    icon: "",
    message: "",
    redirectionLink: "",
    title: "",
  });
  const [show, setShow] = useState(false);
  useEffect(() => {
    const subscription = alertService.onAlert().subscribe((data: any) => {
      if (data) {
        setShow(true);
        setAlert(data);
      } else {
        setAlert({
          buttonText: "",
          icon: "",
          message: "",
          redirectionLink: "",
          title: "",
        });
        setShow(false);
      }
      return subscription.unsubscribe;
    });
  }, [alert]);

  const hide = () => {
    setShow(false);
    alertService.clearAlert();
  };

  const redirectTo = () => {
    setShow(false);
    alertService.clearAlert();
    history.push(alert.redirectionLink);
  };

  return (
    <Overlay
      key={alert.icon}
      position="center"
      show={show}
      hide={hide}
      duration={0}
    >
      <div className="modal__container">
        <S.Modal>
          <S.Icon>
            <ReactSVG path={alert.icon} />
          </S.Icon>
          <S.Title>{alert.title}</S.Title>
          <S.Message>{alert.message}</S.Message>
          <S.Footer>
            {alert.redirectionLink ? (
              <Button onClick={redirectTo}>{alert.buttonText}</Button>
            ) : (
              <Button onClick={hide}>{alert.buttonText}</Button>
            )}
          </S.Footer>
        </S.Modal>
      </div>
    </Overlay>
  );
};
