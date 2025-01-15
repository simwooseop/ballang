"use client";
import Image from "next/image";
import useAuthForm from "./AuthForm.hook";
import Input from "./Input";

function LogInModal() {
  const { handleSubmitLogIn, handleChange, errorText, formData } =
    useAuthForm();
  return (
    <div className="mt-14">
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
        <Input
          errorText={errorText.passwordConfirm}
          placeholder="비밀번호 확인"
          type="password"
          onChange={handleChange}
          value={formData.passwordConfirm}
          name="passwordConfirm"
        />
        <button
          className="w-full h-8 text-white bg-blue-500 rounded-md"
          type="submit"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default LogInModal;
