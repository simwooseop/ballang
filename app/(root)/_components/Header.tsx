"use client";
import Link from "next/link";
import React from "react";
import LogInModal from "./LogInModal";
import { useModalStore } from "@/zustand/modal.store";
import { useAuthStore } from "@/zustand/auth.store";
import { ballangClient } from "@/api/ballang.api";

function Header() {
  const setModal = useModalStore((state) => state.setModal);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  const handleClickLogIn = () => {
    setModal(<LogInModal />);
  };

  const handleClickLogOut = async () => {
    await ballangClient.delete("/auth/log-out");
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-white w-screen fixed flex h-16 justify-between items-center border-b border-black/65">
      <section className="ml-5">
        <Link href="/" className="font-bold text-2xl">
          발랑
        </Link>
        <Link href="/brands" className="ml-[5vw]">
          BRANDS
        </Link>
      </section>

      <section className="mr-10">
        {isLoggedIn ? (
          <>
            <Link href="/cart">장바구니</Link>
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
    </header>
  );
}

export default Header;
