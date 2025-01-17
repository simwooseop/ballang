"use client";

import api from "@/api/api";
import { CartProduct } from "@/types/supabaseCustom";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

function CartPage() {
  const currentUser = useAuthStore((state) => state.currentUser);

  const { data: products } = useQuery<CartProduct[]>({
    queryKey: ["cartProducts", currentUser],
    queryFn: async () =>
      (await api.cart.getCartProducts(currentUser!.id)) as CartProduct[],
    enabled: !!currentUser,
  });

  if (!products)
    return (
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="text-3xl">장바구니가 비었습니다...</h2>
      </div>
    );

  return (
    <div className="max-w-[1200px] mx-auto text-center">
      <h2 className="text-3xl mb-5">장바구니</h2>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className="border-y-4 border-pink-300 items-center flex gap-x-5 p-5"
          >
            <section className="w-[10vw] h-[15vw] relative">
              <Image
                className="cover"
                src={product.imgSrc}
                alt={product.name}
                fill={true}
              />
            </section>

            <section className="flex flex-col items-start">
              <span className="block text-black/60 border-b border-black/30">
                {product.brands.nameKr} / {product.brands.nameEn}
              </span>
              <span className="text-xl">{product.name}</span>

              <span className="text-red-500 line-through mt-5">
                \{product.originalPrice.toLocaleString()}
              </span>
              <span className="text-xl">\{product.price.toLocaleString()}</span>
            </section>

            <section className="text-2xl ml-auto self-end grid grid-cols-6 bg-gradient-to-t from-gray-400 to-gray-100 rounded-2xl p-2">
              <button>-</button>

              <span className="col-span-4">{product.quantity}</span>

              <button>+</button>
            </section>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CartPage;
