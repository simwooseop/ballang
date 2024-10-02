import { ballangClient } from "@/api/ballang.api";
import { Product } from "@/types/ballang.type";
import React from "react";

async function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const productId = params.productId;

  const response = await ballangClient.get(`/products/${productId}`);
  const product = (await response.data.result) as Product;

  return (
    <div className="pt-32 mx-auto w-[60vw] h-[85vh] justify-center flex flex-row gap-x-5">
      <img className="object-cover" src={product.imgSrc} />

      <div>
        <h2 className="text-md font-bold pb-3 mb-3 border-b border-black/30">
          {product.brand.nameKr} / {product.brand.nameEn}
        </h2>
        <p className="text-lg mb-10">{product.name}</p>

        <section className="grid grid-cols-2 w-[35%] gap-y-5">
          <strong>정가</strong>
          <strong className="text-red-500 line-through">
            ₩{product.originalPrice.toLocaleString()}
          </strong>
          <strong>판매가</strong>
          <strong>₩{product.price}</strong>
          <strong>배송</strong>
          <p>{product.deliveryType}</p>
          <strong>잔여 재고</strong>
          <p>{product.onlineStock}</p>
        </section>

        <button className="w-[100%] h-14 hover:-translate-y-2 transition bg-black text-white font-bold mt-10 ">
          장바구니에 담기
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;
