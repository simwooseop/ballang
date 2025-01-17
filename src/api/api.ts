import { cartApi } from "./cart";
import { productApi } from "./product";
import { profilesApi } from "./profiles";

const api = {
  product: productApi,
  cart: cartApi,
  profile: profilesApi,
};

export default api;
