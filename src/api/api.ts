import { cartApi } from "./cart";
import { cartProductApi } from "./cartProduct";
import { productApi } from "./product";
import { profilesApi } from "./profiles";

const api = {
  product: productApi,
  cart: cartApi,
  profile: profilesApi,
  cartProduct: cartProductApi,
};

export default api;
