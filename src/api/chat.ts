import { Chat } from "@/types/chat";
import axios from "axios";

const getMessages = async (userId: string) => {
  const { data } = await axios.get<Chat[]>("http://localhost/chats", {
    params: { roomId: userId },
  });
  const messages = data.map((msg) => `${msg.userName} : ${msg.message}`);
  return messages;
};

const chatApi = { getMessages };

export default chatApi;
