import { supabase } from "@/supabase/supabase";
import { ProductData } from "@/types/supabaseCustom";

export type CartProductData = {
  cartId: number;
  quantity: number;
  productId: number;
};
const addCart = async (cartProductData: CartProductData) => {
  const { data } = await supabase.from("cartProducts").insert(cartProductData);
  return data;
};

const removeCart = async (cartProductId: number) => {
  const { data } = await supabase
    .from("cartProducts")
    .delete()
    .eq("id", cartProductId);
  return data;
};

const decreaseProduct = async (productData: ProductData) => {
  const { data } = await supabase
    .from("cartProducts")
    .update({ quantity: productData.quantity - 1 })
    .eq("id", productData.cartProductId);
  return data;
};

const increaseProduct = async (productData: ProductData) => {
  console.log(productData.cartProductId);
  const { data } = await supabase
    .from("cartProducts")
    .update({ quantity: productData.quantity + 1 })
    .eq("id", productData.cartProductId);
  return data;
};

export const cartProductApi = {
  addCart,
  removeCart,
  decreaseProduct,
  increaseProduct,
};
