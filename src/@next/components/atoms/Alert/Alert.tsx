import { Overlay } from "@components/organisms";
import WrongIcon from "images/auna/wrong.svg";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ReactSVG from "react-svg";
import { Button } from "../Button";
import { alertService } from "./AlertService";
import * as S from "./styles";
import { IAlertServiceProps } from "./types";

const dataInitial: IAlertServiceProps = {
  buttonText: "",
  icon: "",
  title: "",
};
export const Alert: React.FC<any> = () => {
  const history = useHistory();
  const [alert, setAlert] = useState<IAlertServiceProps>(dataInitial);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const subscription = alertService.onAlert().subscribe((data: IAlertServiceProps) => {
      if (data) {
        setShow(true);
        setAlert(data);
      } else {
        setAlert(dataInitial);
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
    if (alert.redirectionLink) {
      history.push(alert.redirectionLink);
    }
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
            <ReactSVG path={alert.icon || WrongIcon} />
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
