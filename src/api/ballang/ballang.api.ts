import axios from "axios";

const baseURL = "https://api.ballang.yoojinyoung.com/";
export const ballangClient = axios.create({
  baseURL,
  withCredentials: true,
});

const getProducts = async () => {
  try {
    const response = await ballangClient.get("/products");
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

const getBrands = async () => {
  try {
    const response = await ballangClient.get("/brands");
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const ballangApi = {
  getProducts,
  getBrands,
};
