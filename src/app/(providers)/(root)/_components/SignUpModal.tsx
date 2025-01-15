"use client";
import { supabase } from "@/supabase/supabase";
import { InputChangeEvent } from "@/types/reactCustom.type";
import Image from "next/image";
import { useState } from "react";
import Input from "./Input";

const initialErrorText = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const initialFormData = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SignUpModal() {
  const [formData, setFormData] = useState(initialFormData);
  const [errorText, setErrorText] = useState(initialErrorText);

  // 유효성검사
  const validateFn = (name: string, value: string) => {
    if (name === "name") {
      if (value.length > 6) return "이름은 6자 이하로 입력해주세요.";
    }
    if (name === "email") {
      if (!regex.test(value)) return "이메일 형식이 아닙니다.";
    }
    if (name === "password") {
      if (value.length < 6) return "비밀번호는 6자 이상으로 입력해주세요.";
    }
    if (name === "passwordConfirm") {
      if (value !== formData.password) return "비밀번호가 일치하지 않습니다.";
    }
    return "";
  };

  // 에러메시지 불변성관리
  const updateErrorText = (name: string, message: string) => {
    setErrorText((prevErrorText) => ({ ...prevErrorText, [name]: message }));
  };

  // 인풋값 리팩토링(코드 간소화) & 불변성관리
  const handleChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    const errorMessage = validateFn(name, value);
    updateErrorText(name, errorMessage);
  };

  const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmpty = Object.values(formData).some((value) => value === "");
    const hasError = Object.values(errorText).some((value) => value !== "");
    if (isEmpty || hasError) return alert("입력값을 확인해주세요");

    const userInfo = {
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
        },
      },
    };
    const { data } = await supabase.auth.signUp(userInfo);
    console.log(data);
  };

  return (
    <div className="mt-14">
      <Image
        src="/logo.png"
        alt="logo"
        width={72}
        height={72}
        className="mx-auto mb-10 rounded-md"
      />
      <form onSubmit={handleSubmitSignUp} className="grid gap-2">
        <Input
          errorText={errorText.name}
          placeholder="이름"
          type="text"
          onChange={handleChange}
          value={formData.name}
          name="name"
        />
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

export default SignUpModal;
