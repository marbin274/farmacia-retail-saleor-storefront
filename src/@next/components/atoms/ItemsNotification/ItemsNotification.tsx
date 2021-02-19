import React, { useEffect, useState } from "react";
import { itemNotificationsService } from "./ItemsNotificationService";
import { IItemsNotificationServiceProps } from "./types";
import * as S from "./styles";
import { Button } from "..";
import ReactSVG from "react-svg";
import CloseIcon from "images/close.svg";
import CheckIcon from "images/check.svg";
import { debounceTime, tap } from "rxjs/operators";

export const ItemsNotification: React.FC<any> = () => {
  const [notifications, setNotifications] = useState<
    IItemsNotificationServiceProps[]
  >([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const subscription = itemNotificationsService
      .onNotifications()
      .pipe(
        tap(x => {
          setShow(false);
        }),
        debounceTime(3000)
      )
      .subscribe((data: IItemsNotificationServiceProps[]) => {
        if (data) {
          setShow(true);
          setNotifications(data);
          setTimeout(() => {
            setShow(false);
            // itemNotificationsService.clearNotifications();
          }, 3000);
        } else {
          setNotifications([]);
          setShow(false);
        }
        return subscription.unsubscribe;
      });
  }, []);

  const hide = () => {
    setShow(false);
    itemNotificationsService.clearNotifications();
  };

  return show ? (
    <S.NotificationContainer>
      <div className="container">
        <S.ItemNotification>
          <S.Header>
            {notifications.length > 1 ? (
              <p>Productos Agregados</p>
            ) : (
              <p>Producto Agregado</p>
            )}
            <Button onClick={hide}>
              <ReactSVG path={CloseIcon} />
            </Button>
          </S.Header>
          <S.Body>
            {notifications.map(message => {
              return (
                <S.Item key={message.product.id}>
                  <div className="check">
                    <ReactSVG path={CheckIcon} />
                  </div>
                  <div>
                    <label>
                      <strong>{message.quantity}</strong>
                    </label>
                    &nbsp;
                    <label>{message.product.name}</label>
                  </div>
                </S.Item>
              );
            })}
          </S.Body>
        </S.ItemNotification>
      </div>
    </S.NotificationContainer>
  ) : null;
};
