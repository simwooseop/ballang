"use client";
import { useModalStore } from "@/zustand/modal.store";
import React, { ComponentProps, PropsWithChildren, useRef } from "react";

function Backdrop({ children }: PropsWithChildren) {
  const setModal = useModalStore((state) => state.setModal);
  const BackdropRef = useRef<HTMLInputElement | null>(null);

  const handleClickBackdrop: ComponentProps<"div">["onClick"] = (e) => {
    const Backdrop = BackdropRef.current;
    if (Backdrop === e.target) setModal(null);
  };

  return (
    <div
      onClick={handleClickBackdrop}
      ref={BackdropRef}
      className="z-20 flex justify-center items-center fixed z-10 w-screen h-screen bg-black/75"
    >
      <div className="rounded-md flex flex-col items-center bg-white w-[400px] h-[450px]">
        <h2 className="mt-24 font-bold text-3xl">로그인</h2>
        {children}
      </div>
    </div>
  );
}

export default Backdrop;
