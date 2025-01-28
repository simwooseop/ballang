import { cartApi } from "./cart";
import { cartProductApi } from "./cartProduct";
import chatApi from "./chat";
import { productApi } from "./product";
import { profilesApi } from "./profiles";

const api = {
  product: productApi,
  cart: cartApi,
  profile: profilesApi,
  cartProduct: cartProductApi,
  chat: chatApi,
};

export default api;
