import { useNavigate, useParams } from "react-router-dom";
import { Card, cards } from "../../assets/cards";
import { useContext, useEffect, useState } from "react";
import s from "./CardDetail.module.scss";
import Button from "../../components/Button/Button";
import { ArrowRight } from "../../assets/icons/ArrowRight";
import { ElementsContext } from "../../components/MainLayout/MainLayout";

const CardDetail = () => {
  const { removeHoverElementsRefs } = useContext(ElementsContext);
  const navigate = useNavigate();
  const [card, setCard] = useState<Card | null>(null);
  const params = useParams() as { id: any };

  useEffect(() => {
    if (params && params?.id) {
      const searchCard = cards.find((c) => c.id == params.id);
      if (searchCard) setCard(searchCard);
    }
    return () => {
      removeHoverElementsRefs();
    };
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.back}>
        <Button
          category="secondary"
          icon={<ArrowRight style={{ rotate: "180deg" }} />}
          text="Go back"
          id="go_back_card_detail"
          onClick={() => navigate("/cards")}
        />
      </div>
      {card && (
        <div className={s.container}>
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
        </div>
      )}
      <div>
        <div className={s.label}>Description: </div>
        <div className={s.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          molestie ornare sollicitudin. Praesent imperdiet consequat semper.
          Mauris a nunc nec mauris tincidunt ullamcorper. Duis eget tellus leo.
          Aenean dapibus eget risus in suscipit. Etiam a ultricies magna. Cras
          consequat, nisl lobortis condimentum varius, odio orci fringilla
          neque, a condimentum massa mi non mauris. Proin dictum hendrerit
          malesuada. Nam condimentum velit eu luctus ultrices. Nullam aliquet
          justo quis turpis suscipit, vitae ultricies magna faucibus. Donec
          blandit luctus posuere. Aliquam viverra dapibus purus, id blandit ex
          placerat quis. Quisque tristique ligula ut pretium maximus. Maecenas
          tempus eget sem et aliquam. Mauris mattis quam vehicula tincidunt
          ultricies. Sed placerat sed ipsum in porttitor. Ut mattis placerat
          tortor vitae bibendum. Integer purus justo, congue ut leo hendrerit,
          scelerisque auctor ex. Quisque tristique metus sed ante elementum
          ullamcorper. Proin in nunc facilisis, tempor justo pretium, eleifend
          purus. Nulla sed mauris et justo efficitur volutpat. Donec non ipsum
          non velit dapibus bibendum. Nam laoreet, urna eu placerat feugiat,
          arcu mi tempus arcu, eget lobortis quam quam in arcu. Phasellus a
          magna dui.
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
