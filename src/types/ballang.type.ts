export type Product = {
  id: number;
  name: string;
  imgSrc: string;
  originalPrice: number;
  price: number;
  brand: {
    id: number;
    nameKr: string;
    nameEn: string;
  };
};
