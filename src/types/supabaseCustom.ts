import { Database } from "./supabase";

export type ProductsTable = Database["public"]["Tables"]["products"];

export type BrandsTable = Database["public"]["Tables"]["brands"];

export type Product = ProductsTable["Row"] & {
  brands: BrandsTable["Row"];
};

export type CartProductsTable = Database["public"]["Tables"]["cartProducts"];

export type CartsTable = Database["public"]["Tables"]["carts"];

export type User = {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  createdAt?: string;
};

export type CartProduct = Database["public"]["Tables"]["products"]["Row"] & {
  brands: BrandsTable["Row"];
} & {
  quantity: number;
};
