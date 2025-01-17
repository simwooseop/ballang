import { supabase } from "@/supabase/supabase";
import { Product } from "@/types/supabaseCustom";

const getProducts = async () => {
  try {
    const { data } = await supabase
      .from("products")
      .select("*, brandId, brands(id, *)");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (productId: string) => {
  try {
    const { data: product } = await supabase
      .from("products")
      .select("*, brandId, brands(*)")
      .eq("id", productId)
      .single();
    return product as Product;
  } catch (error) {
    console.log(error);
  }
};

export const productApi = {
  getProducts,
  getProduct,
};
