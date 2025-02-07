"use client";

import api from "@/api/api";
import { CartProductData } from "@/api/cartProduct";
import { CartProduct, CartsTable } from "@/types/supabaseCustom";
import { useAuthStore } from "@/zustand/auth.store";
import useModalStore from "@/zustand/modal.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SignUpModal from "../../../_components/SignUpModal";

interface AddCartButtonProps {
  productId: number;
}

function CartButton({ productId }: AddCartButtonProps) {
  const queryClient = useQueryClient();
  const isLogIn = useAuthStore((state) => state.isLogIn);
  const setModal = useModalStore((state) => state.setModal);
  const currentUser = useAuthStore((state) => state.currentUser);
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  const { data: cart } = useQuery<CartsTable["Row"]>({
    queryKey: ["cart", currentUser],
    queryFn: () =>
      api.cart.getCart(currentUser!.id) as Promise<CartsTable["Row"]>,
    enabled: !!currentUser,
  });

  const { data: products } = useQuery<CartProduct[]>({
    queryKey: ["cartProducts", { currentUser, isLogIn }],
    queryFn: () =>
      api.cart.getCartProducts(currentUser!.id) as Promise<CartProduct[]>,
    enabled: !!currentUser && !!isLogIn,
  });

  const { mutate: addCart } = useMutation({
    mutationFn: (cartProductData: CartProductData) =>
      api.cartProduct.addCart(cartProductData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["cartProducts"] }),
  });

  const { mutate: removeCart } = useMutation({
    mutationFn: (cartProductId: number) =>
      api.cartProduct.removeCart(cartProductId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["cartProducts"] }),
  });

  const handleClickAddCartButton = async () => {
    if (!isLogIn) return setModal(<SignUpModal />);
    if (!cart) return;

    const cartProductData = {
      cartId: cart.id,
      quantity: 1,
      productId,
    };
    addCart(cartProductData);
  };

  const handleClickRemoveCartButton = async () => {
    if (!cart) return;
    if (!products) return;

    const cartProductId = products.find(
      (product) => product.id === productId
    )!.cartProductId;
    removeCart(cartProductId);
  };

  if (!isAuthInitialized) return null;

  return products?.some((product) => product.id === productId) ? (
    <button
      onClick={handleClickRemoveCartButton}
      className="mt-auto rounded-md border-4 border-red-500 h-10"
    >
      장바구니에서 제거
    </button>
  ) : (
    <button
      onClick={handleClickAddCartButton}
      className="mt-auto rounded-md bg-pink-300 h-10"
    >
      장바구니 담기
    </button>
  );
}

export default CartButton;
