import React, { useEffect, useState } from "react";
import { itemNotificationsService } from "./ItemsNotificationService";
import { IItemsNotificationServiceProps } from "./types";
import * as S from "./styles";
import { Button } from "..";
import ReactSVG from "react-svg";
import CloseIcon from "images/close.svg";
import CheckIcon from "images/check.svg";

export const ItemsNotification: React.FC<any> = () => {
  const [notifications, setNotifications] = useState<
    IItemsNotificationServiceProps[]
  >([]);

  useEffect(() => {
    let interval: number;
    let seconds = 0;
    const subscription = itemNotificationsService
      .onNotifications()
      .subscribe((data: IItemsNotificationServiceProps) => {
        seconds = 0;
        if (interval) {
          clearInterval(interval);
        }

        if (data) {
          setNotifications(not => {
            if (not.filter(x => x.product.id === data.product.id).length) {
              const index = not.findIndex(
                x => x.product.id === data.product.id
              );
              not[index].quantity += data.quantity;
            } else {
              return [...not, data];
            }

            return [...not];
          });

          interval = setInterval(() => {
            seconds++;
            if (seconds > 3) {
              clearInterval(interval);
              setNotifications([]);
            }
          }, 1000);
        } else {
          setNotifications([]);
        }
        return subscription.unsubscribe;
      });
  }, []);

  const hide = () => {
    setNotifications([]);
  };

  return notifications.length > 0 ? (
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
            {notifications.map((message, index) => {
              return (
                <S.Item key={index}>
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
