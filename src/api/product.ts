import { supabase } from "@/supabase/supabase";
import { Product, ProductPage } from "@/types/supabaseCustom";

const getInfiniteProducts = async (page: number, brandId?: number) => {
  const query = supabase
    .from("products")
    .select("*, brands(*)", { count: "exact" })
    .range(page * 15, page * 15 + 14);
  const filteredQuery = brandId ? query.eq("brandId", brandId) : query;

  const { data, error, count } = await filteredQuery.returns<Product[]>();

  if (error) return console.log(error);

  const products = {
    data,
    hasMore: (page + 1) * 15 < count!,
  };

  return products as ProductPage;
};

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
  getInfiniteProducts,
  getProducts,
  getProduct,
};
