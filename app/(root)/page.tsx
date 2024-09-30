/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { ballangAPI } from "@/api/ballang.api";
import { Product } from "@/types/ballang.type";
import Link from "next/link";

async function HomePage() {
  const response = await ballangAPI.get("/products");
  const products = (await response.data.result) as Product[];
  return (
    <main className="text-center">
      <h2 className="pt-32 text-3xl font-bold">Trending</h2>
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
    </main>
  );
}

export default HomePage;
