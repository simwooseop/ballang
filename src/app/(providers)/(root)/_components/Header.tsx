"use client";

import useModalStore from "@/zustand/modal.store";
import Image from "next/image";
import Link from "next/link";
import SignUpModal from "./SignUpModal";

function Header() {
  const setModal = useModalStore((state) => state.setModal);

  // const handleClickLogIn =

  const handleClickSignUp = () => {
    setModal(<SignUpModal />);
  };

  return (
    <header className="w-screen flex items-center h-16 fixed z-10 border-b ">
      <div className="flex justify-between max-w-[1200px] mx-auto w-full">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={44}
            height={44}
            className="rounded-md"
          />
        </Link>

        <button>Brands</button>

        <section className="flex gap-3">
          <button>로그인</button>
          <button onClick={handleClickSignUp}>회원가입</button>
        </section>
      </div>
    </header>
  );
}

export default Header;
