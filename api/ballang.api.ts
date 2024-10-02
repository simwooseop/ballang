import { Brand, Product } from "@/types/ballang.type";
import axios from "axios";

const baseURL = "https://api.ballang.yoojinyoung.com/";
export const ballangClient = axios.create({
  baseURL,
  withCredentials: true,
});

export const getBrands = async () => {
  try {
    const response = await ballangClient.get(`/brands`);
    const brands = (await response.data.result) as Brand[];
    return brands;
  } catch (e) {
    console.log(e);
  }
};

export const getProducts = async () => {
  try {
    const response = await ballangClient.get("/products");
    const products = (await response.data.result) as Product[];
    return products;
  } catch (e) {
    console.log(e);
  }
};

export const getBrandProducts = async (brandId: string | undefined) => {
  try {
    const response = await ballangClient.get(
      brandId === undefined ? "/products" : `/brands/${brandId}`
    );
    const result = (await response.data.result) as Product[];
    const products = (await response.data.result.products) as Product[];

    if (brandId === undefined) return result;
    return products;
  } catch (e) {
    console.log(e);
  }
};
