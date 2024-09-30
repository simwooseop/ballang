"use client";
import { getProducts } from "@/api/ballang.api";
import { useQuery } from "@tanstack/react-query";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Link from "next/link";
import React from "react";

function ProductList() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

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

export default ProductList;
