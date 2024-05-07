import { FC, ReactNode, useContext } from "react";
import s from "./ModalFrame.module.scss";
import { ModalFrameContext, ModalName } from "../../../hooks/useModalFrame";
import ModalCard from "../ModalCard/ModalCard";

const ModalFrameOverlay: FC<{ children: ReactNode; closeFunc: () => void }> = ({
  children,
  closeFunc,
}) => {
  return (
    <div
      id="overlay"
      className={s.overlay}
      onClick={(e) => {
        e.stopPropagation();
        closeFunc();
      }}
    >
      <div
        className={s.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

const ModalFrame = () => {
  const { closeModal, modalFrame } = useContext(ModalFrameContext);
  const closeFunc = (name: ModalName) => closeModal(name);

  return (
    <>
      {modalFrame.card.isOpen && (
        <ModalFrameOverlay closeFunc={() => closeFunc("card")}>
          <ModalCard
            data={modalFrame.card}
            closeFunc={() => closeFunc("card")}
          />
        </ModalFrameOverlay>
      )}
    </>
  );
};

export default ModalFrame;
