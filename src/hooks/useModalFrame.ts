import { createContext, useCallback, useState } from "react";

export type ModalName = "card";

type ModalParams = {
  isOpen: boolean;
  otherParams?: any;
};

type ModalFrameState = Record<ModalName, ModalParams>;

const initialModalFrameState: ModalFrameState = {
  card: {
    isOpen: false,
  },
};

type ModalFrameContext = {
  modalFrame: ModalFrameState;
  openModal: (name: ModalName, otherParams?: any) => void;
  closeModal: (name: ModalName) => void;
};

export const ModalFrameContext = createContext<ModalFrameContext>(null!);

export const useModalFrame = (): ModalFrameContext => {
  const [modalFrame, setModalFrame] = useState<ModalFrameState>(
    initialModalFrameState
  );

  const openModal = useCallback(
    (name: ModalName, otherParams?: any) => {
      setModalFrame((prevModalFrame) => ({
        ...prevModalFrame,
        [name]: {
          isOpen: true,
          otherParams,
        },
      }));
    },
    [setModalFrame]
  );

  const closeModal = useCallback(
    (name: ModalName) => {
      setModalFrame((prevModalFrame) => ({
        ...prevModalFrame,
        [name]: {
          isOpen: false,
        },
      }));
    },
    [setModalFrame]
  );

  return { openModal, closeModal, modalFrame };
};
