"use client";
import { getBrands } from "@/api/ballang.api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import BrandProductList from "../_components/BrandProductList";

function BrandsPage() {
  const params = useSearchParams();
  const brandId = params.get("brandId");

  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
  });

  return (
    <main className="flex flex-col items-center">
      <h2 className={"pt-32 text-3xl font-bold"}>Brands</h2>
      <p
        className={
          "mt-8 text-sm mb-5 " +
          (brandId === null ? "font-bold" : "font-normal")
        }
      >
        ALL
      </p>

      <ul className="text-sm text-gray-500 gap-y-5 mb-10 text-center grid grid-cols-6 w-[50vw]">
        {brands?.map((brand) => (
          <Link
            className={
              "hover:text-black " +
              (brand.id === Number(brandId) ? "font-bold text-black" : null)
            }
            key={brand.id}
            href={{ pathname: "/brands", query: { brandId: `${brand.id}` } }}
          >
            {brand.nameKr}
          </Link>
        ))}
      </ul>

      <BrandProductList />
    </main>
  );
}

export default BrandsPage;
