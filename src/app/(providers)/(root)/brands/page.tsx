import api from "@/api/api";
import { supabase } from "@/supabase/supabase";
import { BrandsTable, ProductPage } from "@/types/supabaseCustom";
import Link from "next/link";
import ProductList from "../_components/ProductList";

interface BrandsPageProps {
  searchParams: Promise<{ brandId: string }>;
}

async function BrandsPage({ searchParams }: BrandsPageProps) {
  const { brandId } = await searchParams;
  const { data: brands } = await supabase
    .from("brands")
    .select("*")
    .returns<BrandsTable["Row"][]>();

  const initialProducts = (await api.product.getInfiniteProducts(
    0,
    Number(brandId)
  )) as ProductPage;

  if (!brands) return null;

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-y-5">
      <h1 className="text-center text-3xl">BRANDS</h1>
      <Link
        className={brandId === undefined ? "text-black" : "text-gray-400"}
        href="/brands"
      >
        ALL
      </Link>

      <ul className="grid grid-cols-6 text-sm text-gray-400 gap-y-5 text-center w-full">
        {brands.map((brand) => (
          <li
            key={brand.id}
            className={brand.id === Number(brandId) ? "text-black" : ""}
          >
            <Link
              href={{ pathname: "/brands", query: { brandId: `${brand.id}` } }}
            >
              {brand.nameKr}
            </Link>
          </li>
        ))}
      </ul>

      <ProductList
        initialProducts={initialProducts}
        brandId={Number(brandId)}
      />
    </div>
  );
}

export default BrandsPage;
