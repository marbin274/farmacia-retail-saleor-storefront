import React, { FC, useState, useEffect } from "react";
import { Button } from "@farmacia-retail/farmauna-components";
import { Modal } from "@components/organisms";
import { CreditCardItem } from "@components/molecules";
import { UserDetails_me_cardTokens } from "@temp/@sdk/queries/gqlTypes/UserDetails";
import { ICardTokenPaymentGatewayProps } from "./types";
import { Content } from "./styles";

export const CardTokenPaymentGateway: FC<ICardTokenPaymentGatewayProps> = ({
  cardTokens,
  onSelectCardToken,
  selectedCardTokenId,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentCardToken, setCurrentCardToken] = useState<
    UserDetails_me_cardTokens
  >();
  const [cardsToSelect, setCardsToSelect] = useState<
    UserDetails_me_cardTokens[]
  >([]);
  const [newSelectedCardId, setNewSelectedCardId] = useState<string>();

  useEffect(() => {
    if (cardTokens.length > 0) {
      const favorite = cardTokens.find(c => c.default === true);

      if (favorite) {
        setCurrentCardToken(favorite);
      } else {
        setCurrentCardToken(cardTokens[0]);
      }
    }
  }, []);

  const onClickSelectAnotherCard = () => {
    const nonSelectedCards = cardTokens.filter(
      c => c.id !== currentCardToken.id
    );

    setCardsToSelect(nonSelectedCards);
    setShowModal(true);
  };

  const handleSelectNewCard = () => {
    const card = cardTokens.find(c => c.id === newSelectedCardId);

    setCurrentCardToken(card);
    onSelectCardToken(card.id);
    setShowModal(false);
    setNewSelectedCardId(undefined);
  };

  return (
    <>
      <div>
        <p className="fa-mb-4 fa-text-neutral-dark">Seleccionar para comprar</p>
        {currentCardToken && (
          <CreditCardItem
            selected={currentCardToken.id === selectedCardTokenId}
            className="fa-w-full md:fa-w-96 fa-mb-4"
            creditCard={currentCardToken}
            onClickSelect={id => onSelectCardToken(id)}
          />
        )}
        {cardTokens.length > 1 && (
          <Button variant="outline" onClick={onClickSelectAnotherCard}>
            Elegir otra tarjeta
          </Button>
        )}
      </div>
      <Modal
        title="Mis tarjetas guardadas"
        show={showModal}
        hide={() => {
          setNewSelectedCardId(undefined);
          setShowModal(false);
        }}
        disabled={false}
        contentClassName="fa-p-0 fa-m-0 fa-mt-6"
      >
        <Content className="fa-p-4 fa-bg-neutral-light fa-overflow-scroll">
          {cardsToSelect.map(c => (
            <CreditCardItem
              selected={c.id === newSelectedCardId}
              className="fa-w-full fa-mb-4"
              creditCard={c}
              onClickSelect={id => setNewSelectedCardId(id)}
            />
          ))}
        </Content>
        <div className="fa-p-4 fa-bg-white">
          <Button className="fa-w-full" onClick={handleSelectNewCard}>
            Listo
          </Button>
        </div>
      </Modal>
    </>
  );
};
