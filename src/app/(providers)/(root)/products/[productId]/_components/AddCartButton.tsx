"use client";

import { useAuthStore } from "@/zustand/auth.store";
import useModalStore from "@/zustand/modal.store";
import SignUpModal from "../../../_components/SignUpModal";

function AddCartButton() {
  const isLogIn = useAuthStore((state) => state.isLogIn);
  const setModal = useModalStore((state) => state.setModal);

  const handleClickAddCartButton = async () => {
    if (!isLogIn) return setModal(<SignUpModal />);
  };
  return (
    <button
      onClick={handleClickAddCartButton}
      className="mt-auto rounded-md bg-pink-300 h-10 "
    >
      장바구니 담기
    </button>
  );
}

export default AddCartButton;
