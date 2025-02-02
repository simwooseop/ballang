"use client";

import api from "@/api/api";
import { supabase } from "@/supabase/supabase";
import { useAuthStore } from "@/zustand/auth.store";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { v4 } from "uuid";

const socket = io("http://smileb.kro.kr");

type Users = {
  id: string;
  name: string;
}[];

function ChattingPage() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [customers, setCustomers] = useState<Users>();
  const currentUser = useAuthStore((state) => state.currentUser);
  const customerId = useSearchParams().get("customerId");

  // socket.io 이벤트리스너
  useEffect(() => {
    socket.on("connect", () => {});
    socket.on("disconnect", () => {});

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  // 메시지 실시간 수신 이벤트리스너
  useEffect(() => {
    if (!messages) return;

    socket.on("receive_msg", ({ userName, message }) => {
      const msg = `${userName} : ${message}`;
      setMessages((prevMsg) => [...prevMsg, msg]);
    });

    return () => {
      socket.off("receive_msg");
    };
  }, [messages]);

  // 관리자가 채팅방(유저) 선택했을 시
  useEffect(() => {
    if (!currentUser) return;
    if (!currentUser.isAdmin || !customerId) return;

    socket.emit("join_room", {
      userName: "관리자",
      room: customerId,
    });
  }, [customerId, currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    // 일반 유저
    if (!currentUser.isAdmin) {
      socket.emit("join_room", {
        userName: currentUser.name,
        room: currentUser.id,
      });
    }

    // 관리자
    if (currentUser.isAdmin) {
      (async () => {
        try {
          const { data: rooms } = await axios.get("http://smileb.kro.kr/rooms");
          const roomIds = rooms.map((room: { roomId: string }) => room.roomId);

          const { data: users, error } = await supabase
            .from("profiles")
            .select("name, id")
            .in("id", roomIds)
            .returns<Users>();
          if (error) return;

          setCustomers(users);
        } catch (error) {
          throw new Error(String(error));
        }
      })();
    }
  }, [currentUser]);

  // 채팅 내역 가져오기
  useEffect(() => {
    if (!currentUser) return;

    (async () => {
      const initialMessages = await api.chat.getMessages(
        customerId || currentUser.id
      );
      setMessages(initialMessages);
    })();
  }, [currentUser, customerId]);

  // 메시지 전송
  const handleSendMessage = () => {
    if (!currentUser || !messages) return;

    const userName = currentUser.isAdmin ? "관리자" : currentUser.name;

    const newMessageData = {
      userName,
      message: newMessage,
      userId: currentUser.id,
      roomId: currentUser.isAdmin ? customerId : currentUser.id,
    };
    socket.emit("send_msg", newMessageData);
    const msg = `${userName} : ${newMessage}`;
    setMessages((prevMsg) => [...prevMsg, msg]);
    setNewMessage("");
  };

  if (!currentUser) return;

  return (
    <div className="max-w-[350px] mx-auto flex items-start">
      {currentUser.isAdmin && (
        <ul className="w-24 -mr-[1px] border border-black h-[600px] flex flex-col items-center">
          {customers &&
            customers.map((user) => (
              <li key={user.id}>
                <Link
                  href={{
                    pathname: "/chat",
                    query: { customerId: `${user.id}` },
                  }}
                >
                  {user.name}{" "}
                </Link>
              </li>
            ))}
        </ul>
      )}
      <div className="border flex flex-col w-full h-[600px] border-black">
        <ul>
          {messages?.map((el) => (
            <li key={v4()}>{el}</li>
          ))}
        </ul>

        <section className="mt-auto grid grid-cols-5 justify-between">
          <input
            className="col-span-4 -ml-[1px] -mb-[1px] border border-black"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            placeholder="message"
          />
          <button
            className="col-span-1 bg-pink-300 text-white"
            onClick={handleSendMessage}
          >
            전송
          </button>
        </section>
      </div>
    </div>
  );
}

export default ChattingPage;
