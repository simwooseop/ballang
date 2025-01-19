"use client";
import api from "@/api/api";
import { ProductPage } from "@/types/supabaseCustom";
import {
  keepPreviousData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

interface ProductListProps {
  initialProducts: ProductPage;
  brandId?: number;
}

interface InfiniteProduct {
  pages: ProductPage[];
  pageParams: [number];
}

function ProductList({ initialProducts, brandId }: ProductListProps) {
  const {
    data: products,
    hasNextPage,
    fetchNextPage,
  }: UseInfiniteQueryResult<InfiniteProduct> = useInfiniteQuery({
    queryKey: ["products", brandId],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      api.product.getInfiniteProducts(pageParam, brandId),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage && lastPage.hasMore ? allPages.length : undefined;
    },
    initialPageParam: 0,
    initialData: {
      pages: [initialProducts],
      pageParams: [0],
    },
    placeholderData: keepPreviousData,
  });

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    },
  });

  return (
    <>
      <ul className="grid gap-4 grid-cols-5">
        {products.pages.map((page) =>
          page.data.map((product) => (
            <li key={product.id}>
              <Link
                className="w-full h-full group flex flex-col text-sm gap-y-1"
                href={`/products/${product.id}`}
              >
                <section className="w-full h-[250px] aspect-square border border-gray-200 rounded-lg relative overflow-hidden">
                  <Image
                    src={product.imgSrc}
                    alt={product.imgSrc}
                    fill={true}
                    sizes="100%"
                    className="object-cover group-hover:scale-110 transition duration-300"
                  />
                </section>
                <span>
                  {product.brands.nameKr} / {product.brands.nameEn}
                </span>
                <strong>{product.name}</strong>
              </Link>
            </li>
          ))
        )}
      </ul>
      <div ref={ref}></div>
    </>
  );
}

export default ProductList;
