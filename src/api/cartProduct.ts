import { supabase } from "@/supabase/supabase";

export type CartProductData = {
  cartId: number;
  quantity: number;
  productId: number;
};
const addCart = async (cartProductData: CartProductData) => {
  const { data } = await supabase.from("cartProducts").insert(cartProductData);
  return data;
};

const removeCart = async (
  cartProductData: Omit<CartProductData, "quantity">
) => {
  const { data } = await supabase
    .from("cartProducts")
    .delete()
    .eq("cartId", cartProductData.cartId)
    .eq("productId", cartProductData.productId);
  return data;
};

export const cartProductApi = { addCart, removeCart };
