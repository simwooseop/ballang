"use client";
import Image from "next/image";
import useAuthForm from "./AuthForm.hook";
import Input from "./Input";

function LogInModal() {
  const { handleSubmitLogIn, handleChange, errorText, formData } =
    useAuthForm();
  return (
    <div>
      <h1 className="text-center text-3xl  mb-5">로그인</h1>
      <Image
        src="/logo.png"
        alt="logo"
        width={72}
        height={72}
        className="mx-auto mb-10 rounded-md"
      />
      <form onSubmit={handleSubmitLogIn} className="grid gap-2">
        <Input
          errorText={errorText.email}
          placeholder="이메일"
          type="text"
          onChange={handleChange}
          value={formData.email}
          name="email"
        />
        <Input
          errorText={errorText.password}
          placeholder="비밀번호"
          type="password"
          onChange={handleChange}
          value={formData.password}
          name="password"
        />
        <button
          className="w-full h-8 text-white bg-pink-300 rounded-md"
          type="submit"
        >
          로그인
        </button>
      </form>
    </div>
  );
}

export default LogInModal;
