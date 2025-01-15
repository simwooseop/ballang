"use client";
import useModalStore from "@/zustand/modal.store";
import { PropsWithChildren } from "react";
import BackDrop from "../_components/BackDrop";

function ModalProvider({ children }: PropsWithChildren) {
  const modal = useModalStore((state) => state.modal);
  return (
    <>
      {children}
      {modal && <BackDrop>{modal}</BackDrop>}
    </>
  );
}

export default ModalProvider;
