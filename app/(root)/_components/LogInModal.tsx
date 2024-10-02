"use client";

import { ballangClient } from "@/api/ballang.api";
import { useAuthStore } from "@/zustand/auth.store";
import { useModalStore } from "@/zustand/modal.store";
import { ComponentProps, useRef } from "react";

function LogInModal() {
  const setModal = useModalStore((state) => state.setModal);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmitForm: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();

    if (!emailInputRef.current) return alert("이메일을 입력해 주세요");
    if (!passwordInputRef.current) return alert("비밀번호를 입력해 주세요");

    const data = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    try {
      await ballangClient.post("/auth/log-in", data);
      setModal(null);
      setIsLoggedIn(true);
    } catch {
      alert("로그인 실패");
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className="flex-col flex mt-10">
      <label className="text-black/65" htmlFor="email">
        이메일
      </label>
      <input
        ref={emailInputRef}
        id="email"
        className="h-12 border border-black/25 rounded-sm"
        type="email"
      />
      <label className="mt-5 text-black/65" htmlFor="password">
        비밀번호
      </label>
      <input
        ref={passwordInputRef}
        id="password"
        className="h-12 border border-black/25 rounded-sm"
        type="password"
      />
      <button
        type="submit"
        className="mt-8 w-[360px] bg-black text-white h-14 font-bold"
      >
        로그인하기
      </button>
    </form>
  );
}

export default LogInModal;
