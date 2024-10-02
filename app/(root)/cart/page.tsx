"use client";

import ballangAPI from "@/api/ballang.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

function CartPage() {
  const queryClient = useQueryClient();

  const { data: carts } = useQuery({
    queryKey: ["carts"],
    queryFn: () => ballangAPI.getCart(),
  });

  const { mutate: decreaseItem } = useMutation({
    mutationFn: (productId: string) => ballangAPI.decreaseItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"], exact: true });
    },
  });
  const { mutate: increaseItem } = useMutation({
    mutationFn: (productId: string) => ballangAPI.increaseItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"], exact: true });
    },
  });

  const handleClickDecreaseItem = (productId: string) => {
    decreaseItem(productId);
  };
  const handleClickIncreaseItem = (productId: string) => {
    increaseItem(productId);
  };

  return (
    <div className="text-center">
      <h2 className="pt-32 text-3xl font-bold">장바구니</h2>
      {carts?.length ? (
        <ul className="flex flex-col ">
          {carts?.map((cartProduct) => (
            <Link
              href={`/products/${cartProduct.productId}`}
              key={cartProduct.product.id}
              className="h-50 mx-96 border-y border-black/25"
            >
              <li className="flex gap-x-5 items-center">
                <img
                  className="w-[15%] h-[100%]"
                  src={cartProduct.product.imgSrc}
                />

                <div className="flex flex-col items-start gap-y-3">
                  <strong>
                    {cartProduct.product.brand.nameKr} /{" "}
                    {cartProduct.product.brand.nameEn}
                  </strong>
                  <p className="text-lg text-start">
                    {cartProduct.product.name}
                  </p>

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

                <div className="z-10 grid grid-cols-3 w-[75px] h-[25px] ml-auto ">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleClickDecreaseItem(cartProduct.productId);
                    }}
                    className="bg-black text-white border border-black w-[25px]"
                  >
                    -
                  </button>
                  <p className="border border-black w-[25px]">
                    {cartProduct.quantity}
                  </p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleClickIncreaseItem(cartProduct.productId);
                    }}
                    className="bg-black text-white border border-black w-[25px]"
                  >
                    +
                  </button>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col">
          <p className="my-10">장바구니가 비어 있습니다.</p>

          <Link
            className="border border-black mx-[750px] h-16 flex items-center justify-center"
            href="/"
          >
            <strong>쇼핑하러가기</strong>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartPage;
