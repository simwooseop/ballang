import { Brand, CartProduct, Product } from "@/types/ballang.type";
import axios from "axios";

const baseURL = "https://api.ballang.yoojinyoung.com/";
export const ballangClient = axios.create({
  baseURL,
  withCredentials: true,
});

const getBrands = async () => {
  try {
    const response = await ballangClient.get(`/brands`);
    const brands = (await response.data.result) as Brand[];
    return brands;
  } catch (e) {
    console.log(e);
  }
};

const getProducts = async (brandId?: string) => {
  try {
    const response = await ballangClient.get(
      brandId === undefined ? "/products" : `/brands/${brandId}`
    );

    if (brandId === undefined) {
      const allProducts = (await response.data.result) as Product[];
      return allProducts;
    }

    const brandProducts = (await response.data.result.products) as Product[];
    return brandProducts;
  } catch (e) {
    console.log(e);
  }
};

const getCart = async () => {
  try {
    const response = await ballangClient.get("/cart");
    const carts = (await response.data.result.items) as CartProduct[];
    return carts;
  } catch (e) {
    console.log(e);
  }
};

const decreaseItem = async (productId: string) => {
  try {
    await ballangClient.delete(`/cart/products/${productId}`);
  } catch (e) {
    console.log(e);
  }
};

const increaseItem = async (productId: string) => {
  try {
    await ballangClient.post(`/cart/products/${productId}`);
  } catch (e) {
    console.log(e);
  }
};

const deleteItem = async (productId: string) => {
  try {
    await ballangClient.delete(`/cart/products/${productId}/clear`);
  } catch (e) {
    console.log(e);
  }
};
const ballangAPI = {
  getBrands,
  getProducts,
  getBrandProducts: getProducts,
  getCart,
  decreaseItem,
  increaseItem,
  deleteItem,
};

export default ballangAPI;
