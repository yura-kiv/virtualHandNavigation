import { useContext } from "react";
import s from "./Cards.module.scss";
import { cards } from "../../assets/cards";
import { ElementsContext } from "../MainLayout/MainLayout";
import { ModalFrameContext } from "../../hooks/useModalFrame";
import { ModalCardParams } from "../modals/ModalCard/ModalCard";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const navigate = useNavigate();
  const { addHoverElementRef } = useContext(ElementsContext);
  const { openModal } = useContext(ModalFrameContext);

  return (
    <div className={s.cards}>
      {cards.map((card) => (
        <div
          key={card.id}
          ref={(node) =>
            addHoverElementRef({
              id: `card_${card.id}`,
              node,
              className: "card",
            })
          }
          className={s.card}
        >
          <div
            className={s.imgWrapper}
            onClick={() => openModal("card", { card } as ModalCardParams)}
            ref={(node) =>
              addHoverElementRef({
                id: `card_img_${card.id}`,
                node,
                className: "card_image",
              })
            }
          >
            <img
              className={s.img}
              src={card.img}
            />
          </div>
          <div className={s.content}>
            <div className={s.title}>{card.title}</div>
            <div className={s.description}>{card.description}</div>
            <div className={s.additional}>
              {card.additionalInfo.category} - {card.additionalInfo.date}
            </div>
          </div>
          <div className={s.buttons}>
            <Button
              id={`card_${card.id}_open_`}
              size="sm"
              text="Open"
              category="outline"
              onClick={() => openModal("card", { card } as ModalCardParams)}
            />
            <Button
              id={`card_${card.id}_go_to_`}
              size="sm"
              text="Go to page"
              onClick={() => navigate(`/cards/${card.id}`)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
