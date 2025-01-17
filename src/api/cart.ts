import { supabase } from "@/supabase/supabase";
import {
  BrandsTable,
  CartProduct,
  CartProductsTable,
  CartsTable,
  ProductsTable,
} from "@/types/supabaseCustom";

const getCart = async (ownerId: string) => {
  try {
    const { data: Products } = await supabase
      .from("carts")
      .select("*")
      .eq("ownerId", ownerId);

    return Products;
  } catch (error) {
    console.log(error);
  }
};

const getCartProducts = async (userId: string) => {
  try {
    const { data: cart, error } = await supabase
      .from("carts")
      .select("id, cartProducts(*, products(*, brands(*)))")
      .eq("ownerId", userId)
      .returns<
        Pick<CartsTable["Row"], "id"> &
          {
            cartProducts: (CartProductsTable["Row"] & {
              products: ProductsTable["Row"] & { brands: BrandsTable["Row"] };
            })[];
          }[]
      >()
      .single();

    if (error) throw new Error("error :", error);

    const { cartProducts } = cart;
    const result = cartProducts.map((product) => ({
      quantity: product.quantity,
      ...product.products,
    }));

    return result as CartProduct[];
  } catch (error) {
    console.log(error);
  }
};
export const cartApi = { getCart, getCartProducts };
