import React, { useEffect, useState } from "react";
import { itemNotificationsService } from "./ItemsNotificationService";
import { IItemsNotificationServiceProps } from "./types";
import * as S from "./styles";
import { Button, XIcon, CheckIcon } from "@farmacia-retail/farmauna-components";
import { Thumbnail } from "@temp/@next/components/molecules";
import { ISimpleProduct } from "@sdk/types/IProduct";

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

  const getSourceFromProduct = (product: ISimpleProduct) => {
    return {
      thumbnail: {
        url:
          product?.thumbnail?.url ||
          product?.variant?.product?.thumbnail?.url ||
          "",
      },
      thumbnail2x: {
        url:
          product?.thumbnail2x?.url ||
          product?.variant?.product?.thumbnail2x?.url ||
          "",
      },
    };
  };

  return notifications.length > 0 ? (
    <S.NotificationContainer>
      <div className="container">
        <S.ItemNotification>
          <S.Header>
            <S.HeaderTitleEvent>
              <S.HeaderCheckContainer>
                <CheckIcon />
              </S.HeaderCheckContainer>
              <p>
                {notifications.length > 1
                  ? "Productos Agregados"
                  : "Producto Agregado"}
              </p>
            </S.HeaderTitleEvent>
            <Button icon={<XIcon size={8} />} onClick={hide} iconOnly />
          </S.Header>
          <S.Body>
            {notifications.map((message, index) => {
              return (
                <S.Item key={index}>
                  <S.ItemImage>
                    <Thumbnail source={getSourceFromProduct(message.product)} />
                  </S.ItemImage>
                  <label>{message.product.name}</label>
                </S.Item>
              );
            })}
          </S.Body>
        </S.ItemNotification>
      </div>
    </S.NotificationContainer>
  ) : null;
};
