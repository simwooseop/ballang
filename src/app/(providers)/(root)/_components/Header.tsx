"use client";

import { supabase } from "@/supabase/supabase";
import { useAuthStore } from "@/zustand/auth.store";
import useModalStore from "@/zustand/modal.store";
import Image from "next/image";
import Link from "next/link";
import LogInModal from "./LogInModal";
import SignUpModal from "./SignUpModal";

function Header() {
  const setModal = useModalStore((state) => state.setModal);
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);
  const isLogIn = useAuthStore((state) => state.isLogIn);

  const handleClickLogOut = async () => {
    await supabase.auth.signOut();
  };

  const handleClickLogIn = () => {
    setModal(<LogInModal />);
  };

  const handleClickSignUp = () => {
    setModal(<SignUpModal />);
  };

  return (
    <header className="w-screen bg-white flex items-center h-16 fixed z-10 border-b ">
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

        <div className="flex items-center w-[118px] justify-end">
          {isAuthInitialized &&
            (isLogIn ? (
              <button onClick={handleClickLogOut}>로그아웃</button>
            ) : (
              <section className="flex gap-3">
                <button onClick={handleClickLogIn}>로그인</button>
                <button onClick={handleClickSignUp}>회원가입</button>
              </section>
            ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
