import { JSX } from "react";
import { create } from "zustand";

type Modal = JSX.Element | null;

type ModalStore = {
  modal: Modal;
  setModal: (modal: Modal) => void;
};

const useModalStore = create<ModalStore>((set) => ({
  setModal: (modal) => set({ modal }),
  modal: null,
}));

export default useModalStore;
