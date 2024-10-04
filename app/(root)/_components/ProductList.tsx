"use client";
import ballangAPI from "@/api/ballang.api";
import { Product } from "@/types/ballang.type";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

function ProductList({ initialProducts }: { initialProducts: Product[] }) {
  const { data: products = initialProducts } = useQuery({
    queryKey: ["products"],
    queryFn: () => ballangAPI.getBrandProducts(),
  });

  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-y-5 mt-10 gap-x-5 mx-5">
      {products?.map((product) => (
        <Link
          className="hover:scale-105 transition"
          key={product.id}
          href={"/products/" + String(product.id)}
        >
          <li>
            <img src={product.imgSrc} />
            <strong>{product.brand.nameEn}</strong>
            <p className="mt-2">{product.name}</p>
            <div className="flex mt-2">
              <p className="font-bold text-red-500 line-through">
                ₩{product.originalPrice.toLocaleString()}
              </p>
              <p className="ml-2 font-bold">
                ₩{product.price.toLocaleString()}
              </p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default ProductList;
