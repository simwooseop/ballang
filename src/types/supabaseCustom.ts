import { Database } from "./supabase";

export type Product = Database["public"]["Tables"]["products"];

export type Brand = Database["public"]["Tables"]["brands"];
