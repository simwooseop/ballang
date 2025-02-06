import axios from "axios";

const getRoomIds = async () => {
  const { data: rooms } = await axios.get("https://ballang.kro.kr/rooms");
  return rooms;
};

const roomApi = { getRoomIds };
export default roomApi;
