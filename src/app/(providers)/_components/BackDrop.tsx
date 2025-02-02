"use client";

import useModalStore from "@/zustand/modal.store";
import { PropsWithChildren, useRef } from "react";

function BackDrop({ children }: PropsWithChildren) {
  const backDropRef = useRef<null | HTMLDivElement>(null);
  const setModal = useModalStore((state) => state.setModal);

  const handleClickBackDrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target == backDropRef.current) setModal(null);
  };

  return (
    <div
      className="flex items-center w-screen h-screen top-0 z-20 fixed bg-black/35"
      onClick={handleClickBackDrop}
      ref={backDropRef}
    >
      <div className="bg-white rounded-md w-auto h-auto mx-auto p-10">
        {children}
      </div>
    </div>
  );
}

export default BackDrop;
