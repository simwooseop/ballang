"use client";

import { ballangClient } from "@/api/ballang.api";
import { CartProduct } from "@/types/ballang.type";
import Link from "next/link";
import { useEffect, useState } from "react";

function CartPage() {
  const [cartProducts, setCartProducts] = useState<CartProduct[] | null>(null);
  useEffect(() => {
    (async () => {
      const response = await ballangClient.get("/cart");
      const products = await response.data.result.items;
      console.log(products);
      setCartProducts(products);
    })();
  }, []);

  return (
    <div className="text-center">
      <h2 className="pt-32 text-3xl font-bold">장바구니</h2>
      {cartProducts?.length ? (
        <ul className="flex flex-col ">
          {cartProducts?.map((cartProduct) => (
            <li
              className="flex h-40 mx-96 gap-x-5 items-center border-y border-black/25"
              key={cartProduct.product.id}
            >
              <img
                className="w-[15%] h-[100%]"
                src={cartProduct.product.imgSrc}
              />
              <div className="flex flex-col items-start gap-y-3">
                <strong>
                  {cartProduct.product.brand.nameKr} /{" "}
                  {cartProduct.product.brand.nameEn}
                </strong>
                <p className="text-lg">{cartProduct.product.name}</p>

                <section className="flex">
                  <p className="font-bold text-red-500 line-through">
                    ₩{cartProduct.product.originalPrice.toLocaleString()}
                  </p>
                  <p className="ml-2 font-bold">
                    ₩{cartProduct.product.price.toLocaleString()}
                  </p>
                </section>
                <p className="text-sm">
                  {cartProduct.product.deliveryType} | 잔여재고{" "}
                  {cartProduct.product.onlineStock}ea
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p>장바구니가 비어 있습니다.</p>
          <Link href="/">쇼핑하러 가기</Link>
        </>
      )}
    </div>
  );
}

export default CartPage;
