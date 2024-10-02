"use client";
import Link from "next/link";
import React from "react";
import LogInModal from "./LogInModal";
import { useModalStore } from "@/zustand/modal.store";
import { useAuthStore } from "@/zustand/auth.store";
import { ballangClient } from "@/api/ballang.api";
import { useRouter } from "next/navigation";

function Header() {
  const setModal = useModalStore((state) => state.setModal);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const authInitial = useAuthStore((state) => state.authInitial);
  const router = useRouter();

  const handleClickLogIn = () => {
    setModal(<LogInModal />);
  };

  const handleClickLogOut = async () => {
    await ballangClient.delete("/auth/log-out");
    setIsLoggedIn(false);
    router.replace("/");
  };

  return (
    <header className="z-10 bg-white w-screen fixed flex h-16 justify-between items-center border-b border-black/65">
      <section className="ml-5">
        <Link href="/" className="font-bold text-2xl">
          발랑
        </Link>
        <Link href="/brands" className="ml-[5vw]">
          BRANDS
        </Link>
      </section>
      {authInitial ? (
        <section className="mr-10">
          {isLoggedIn ? (
            <>
              <Link href="/cart" className="mr-5">
                장바구니
              </Link>
              <button onClick={handleClickLogOut}>로그아웃</button>
            </>
          ) : (
            <>
              <Link href="/sign-up" className="mr-5">
                회원가입
              </Link>
              <button onClick={handleClickLogIn}>로그인</button>
            </>
          )}
        </section>
      ) : null}
    </header>
  );
}

export default Header;
