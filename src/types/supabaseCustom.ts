import { Database } from "./supabase";

export type ProductsTable = Database["public"]["Tables"]["products"];

export type BrandsTable = Database["public"]["Tables"]["brands"];

export type Product = ProductsTable["Row"] & {
  brands: BrandsTable["Row"];
};
