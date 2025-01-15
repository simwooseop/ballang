import { supabase } from "@/supabase/supabase";

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

export const productApi = {
  getProducts,
};
