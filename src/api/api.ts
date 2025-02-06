import { cartApi } from "./cart";
import { cartProductApi } from "./cartProduct";
import chatApi from "./chat";
import { productApi } from "./product";
import profileApi from "./profile";
import roomApi from "./room";

const api = {
  product: productApi,
  cart: cartApi,
  profile: profileApi,
  cartProduct: cartProductApi,
  chat: chatApi,
  room: roomApi,
};

export default api;
