import { create } from "zustand";

type useParamsState = {
  params: null | string;
  setParams: (params: null | string) => void;
};

export const useParamsStore = create<useParamsState>((set) => ({
  params: null,
  setParams: (params) => set({ params }),
}));
