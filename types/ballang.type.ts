export type CartProduct = {
  cartId: number;
  id: number;
  product: Product;
  productId: string;
  quantity: number;
};
export type Product = {
  id: number;
  name: string;
  imgSrc: string;
  onlineStock: number;
  price: number;
  originalPrice: number;
  deliveryType: string;
  brandId: number;
  brand: Brand;
};

export type Brand = {
  id: number;
  nameKr: string;
  nameEn: string;
};
