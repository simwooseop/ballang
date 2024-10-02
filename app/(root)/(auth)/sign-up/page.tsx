"use client";
import { ballangClient } from "@/api/ballang.api";
import { useAuthStore } from "@/zustand/auth.store";
import { useRouter } from "next/navigation";
import React, { ComponentProps, useRef } from "react";

function SignUpPage() {
  const router = useRouter();

  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmitForm: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();

    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    const passwordConfirm = passwordConfirmInputRef.current!.value;

    if (!email) return alert("이메일을 입력해 주세요");
    if (!password) return alert("비밀번호를 입력해 주세요");
    if (!passwordConfirm || password !== passwordConfirm)
      return alert("비밀번호가 다릅니다");

    const data = {
      email,
      password,
      passwordConfirm,
    };

    await ballangClient.post("/auth/sign-up", data);
    setIsLoggedIn(true);
    router.replace("/");
  };

  return (
    <div className="pt-32 flex flex-col items-center justify-center">
      <h2 className="font-bold text-3xl">회원가입</h2>
      <form onSubmit={handleSubmitForm} className="flex-col flex mt-10">
        <label className="text-black/65" htmlFor="email">
          이메일
        </label>
        <input
          id="email"
          ref={emailInputRef}
          className="h-12 border border-black/25 rounded-sm"
          type="email"
        />
        <label className="mt-5 text-black/65" htmlFor="password">
          비밀번호
        </label>
        <input
          id="password"
          ref={passwordInputRef}
          className="h-12 border border-black/25 rounded-sm"
          type="password"
        />
        <label className="mt-5 text-black/65" htmlFor="password_confirm">
          비밀번호 확인
        </label>
        <input
          id="password_confirm"
          ref={passwordConfirmInputRef}
          className="h-12 mb-10 border border-black/25 rounded-sm"
          type="password"
        />
        <button
          type="submit"
          className="w-[400px] bg-black text-white h-14 font-bold"
        >
          회원가입하기
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
