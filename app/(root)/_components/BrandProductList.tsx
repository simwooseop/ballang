import ballangAPI from "@/api/ballang.api";
import { Product } from "@/types/ballang.type";
import Link from "next/link";
import React from "react";

async function BrandProductList({ brandId }: { brandId: string | undefined }) {
  const products = (await ballangAPI.getBrandProducts(brandId)) as Product[];

  return (
    <ul className="grid grid-cols-6 gap-y-5 gap-x-5 mx-5">
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

export default BrandProductList;
