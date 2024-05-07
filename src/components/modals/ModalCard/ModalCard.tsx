import { FC } from "react";
import s from "./ModalCard.module.scss";
import { Card } from "../../../assets/cards";
import Button from "../../Button/Button";

export type ModalCardParams = {
  card: Card;
};

const ModalCard: FC<any> = ({ closeFunc, data }) => {
  const { card } = data.otherParams as ModalCardParams;

  return (
    <div className={s.wrapper}>
      <div className={s.imgWrapper}>
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
          size="sm"
          text="Close"
          category="outline"
          onClick={closeFunc}
        />
      </div>
    </div>
  );
};

export default ModalCard;
