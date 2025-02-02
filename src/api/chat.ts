import { Chat } from "@/types/chat";
import axios from "axios";

const getMessages = async (userId: string) => {
  const { data } = await axios.get<Chat[]>(
    "https://rocky-savannah-73617-984b81b13be1.herokuapp.com/chats",
    {
      params: { roomId: userId },
    }
  );
  const messages = data.map((msg) => `${msg.userName} : ${msg.message}`);
  return messages;
};

const chatApi = { getMessages };

export default chatApi;
