import { Brand, Product } from "@/types/ballang.type";
import axios from "axios";

export const ballangAPI = axios.create({
  baseURL: "https://api.ballang.yoojinyoung.com",
  withCredentials: true,
});

export const getBrands = async () => {
  try {
    const response = await ballangAPI.get(`/brands`);
    const brands = (await response.data.result) as Brand[];
    return brands;
  } catch (e) {
    console.log(e);
  }
};

export const getProducts = async () => {
  try {
    const response = await ballangAPI.get("/products");
    const products = (await response.data.result) as Product[];
    return products;
  } catch (e) {
    console.log(e);
  }
};

export const getBrandProducts = async (brandId: string | null) => {
  try {
    const response = await ballangAPI.get(
      brandId === null ? "/products" : `/brands/${brandId}`
    );
    const result = (await response.data.result) as Product[];
    const products = (await response.data.result.products) as Product[];

    if (brandId === null) return result;
    return products;
  } catch (e) {
    console.log(e);
  }
};
