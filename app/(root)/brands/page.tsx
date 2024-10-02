import Link from "next/link";
import { Brand } from "@/types/ballang.type";
import BrandProductList from "../_components/BrandProductList";
import ballangAPI from "@/api/ballang.api";

async function BrandsPage({
  searchParams,
}: {
  searchParams: { brandId: string | undefined };
}) {
  const brandId = searchParams.brandId;

  const brands = (await ballangAPI.getBrands()) as Brand[];
  return (
    <main className="flex flex-col items-center">
      <h2 className={"pt-32 text-3xl font-bold"}>Brands</h2>
      <Link href="/brands">
        <p
          className={
            "mt-8 text-sm mb-5 " +
            (brandId === undefined ? "font-bold" : "font-normal")
          }
        >
          ALL
        </p>
      </Link>

      <ul className="text-sm text-gray-500 gap-y-5 mb-10 text-center grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-[50vw]">
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

      <BrandProductList brandId={brandId} />
    </main>
  );
}

export default BrandsPage;
