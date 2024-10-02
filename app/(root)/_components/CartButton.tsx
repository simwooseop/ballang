"use client";
import ballangAPI from "@/api/ballang.api";
import { useAuthStore } from "@/zustand/auth.store";
import { useModalStore } from "@/zustand/modal.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LogInModal from "./LogInModal";

function CartButton({ productId }: { productId: string }) {
  const queryClient = useQueryClient();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setModal = useModalStore((state) => state.setModal);

  const { data: carts } = useQuery({
    queryKey: ["carts"],
    queryFn: () => ballangAPI.getCart(),
  });

  const { mutate: addItem } = useMutation({
    mutationFn: (productId: string) => ballangAPI.increaseItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"], exact: true });
    },
  });
  const { mutate: deleteItem } = useMutation({
    mutationFn: (productId: string) => ballangAPI.deleteItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"], exact: true });
    },
  });

  const handleClickAddItem = async () => {
    if (!isLoggedIn) {
      setModal(<LogInModal />);
    }
    addItem(productId);
  };
  const handleClickDeleteItem = async () => {
    deleteItem(productId);
  };

  const isItemInCart = carts?.some(
    (cart) => cart.product.id === Number(productId)
  );

  return isItemInCart ? (
    <button
      onClick={handleClickDeleteItem}
      className="border border-black w-[100%] h-14 hover:-translate-y-2 transition bg-white text-black font-bold mt-10 "
    >
      장바구니에서 제거
    </button>
  ) : (
    <button
      onClick={handleClickAddItem}
      className="w-[100%] h-14 hover:-translate-y-2 transition bg-black text-white font-bold mt-10 "
    >
      장바구니에 담기
    </button>
  );
}

export default CartButton;
