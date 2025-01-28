"use client";

import api from "@/api/api";
import { CartProduct, ProductData } from "@/types/supabaseCustom";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

function CartPage() {
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((state) => state.currentUser);

  const { data: products } = useQuery<CartProduct[]>({
    queryKey: ["cartProducts", currentUser],
    queryFn: async () =>
      (await api.cart.getCartProducts(currentUser!.id)) as CartProduct[],
    enabled: !!currentUser,
  });

  const { mutate: removeCart } = useMutation({
    mutationFn: async (cartProductId: number) =>
      await api.cartProduct.removeCart(cartProductId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["cartProducts"] }),
  });

  const { mutate: decreaseProduct } = useMutation({
    mutationFn: async (productData: ProductData) =>
      await api.cartProduct.decreaseProduct(productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartProducts"] });
    },
  });

  const { mutate: increaseProduct } = useMutation({
    mutationFn: async (productData: ProductData) =>
      await api.cartProduct.increaseProduct(productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartProducts"] });
    },
  });

  const handleClickDecreaseButton = (product: CartProduct) => {
    if (product.quantity > 1) {
      const productData = {
        cartProductId: product.cartProductId,
        quantity: product.quantity,
      };
      decreaseProduct(productData);
    } else {
      removeCart(product.cartProductId);
    }
  };

  const handleClickIncreaseButton = (product: CartProduct) => {
    const productData = {
      cartProductId: product.cartProductId,
      quantity: product.quantity,
    };
    increaseProduct(productData);
  };

  const totalPrice = products
    ?.map((product) => product.quantity * product.price)
    .reduce((total, currentValue) => total + currentValue, 0);

  return !currentUser ? (
    <div className="max-w-[1200px] mx-auto text-center">
      <h2 className="text-3xl">데이터를 불러오는중...</h2>
    </div>
  ) : products?.length === 0 ? (
    <div className="max-w-[1200px] mx-auto text-center">
      <h2 className="text-3xl">장바구니가 비었습니다...</h2>
    </div>
  ) : (
    <div className="max-w-[1200px] mx-auto text-center">
      <h2 className="text-3xl mb-5">장바구니</h2>
      <ul>
        {products?.map((product) => (
          <li
            key={product.id}
            className="border-y-4 -mb-1 border-pink-300 items-center flex gap-x-5 p-5"
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

            <div className="ml-auto self-end flex flex-col gap-y-2">
              <section className="text-2xl ml-auto grid grid-cols-6 bg-gradient-to-t from-gray-400 to-gray-100 rounded-2xl p-2 w-[6vw]">
                <button onClick={() => handleClickDecreaseButton(product)}>
                  -
                </button>

                <span className="col-span-4">{product.quantity}</span>

                <button onClick={() => handleClickIncreaseButton(product)}>
                  +
                </button>
              </section>

              <span className="text-2xl">
                \{(product.quantity * product.price).toLocaleString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-5">총 합계 : \{totalPrice?.toLocaleString()}</p>
    </div>
  );
}

export default CartPage;
