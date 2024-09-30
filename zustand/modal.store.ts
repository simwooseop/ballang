import { create } from "zustand";

type useModalState = {
  modal: null | React.JSX.Element;
  setModal: (modal: null | React.JSX.Element) => void;
};

export const useModalStore = create<useModalState>((set) => ({
  modal: null,
  setModal: (modal) => set({ modal }),
}));
