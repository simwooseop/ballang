"use client";
import { supabase } from "@/supabase/supabase";
import { InputChangeEvent } from "@/types/reactCustom";
import useModalStore from "@/zustand/modal.store";
import { useState } from "react";

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

function useAuthForm() {
  const setModal = useModalStore((state) => state.setModal);
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
    const { error } = await supabase.auth.signUp(userInfo);
    if (error) return console.log(error);
    setModal(null);
  };

  const handleSubmitLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, passwordConfirm, ...logInFormData } = formData;
    void name;
    void passwordConfirm;
    const isEmpty = Object.values(logInFormData).some((value) => value === "");

    const { passwordConfirm: pwConfirm, ...logInErrorText } = errorText;
    void pwConfirm;
    const hasError = Object.values(logInErrorText).some(
      (value) => value !== ""
    );
    if (isEmpty || hasError) return alert("입력값을 확인해주세요");

    const { error } = await supabase.auth.signInWithPassword({
      email: logInFormData.email,
      password: logInFormData.password,
    });

    if (error) return console.log(error);
    setModal(null);
  };

  return {
    formData,
    errorText,
    handleChange,
    handleSubmitSignUp,
    handleSubmitLogIn,
  };
}

export default useAuthForm;
