import { ballangAPI } from "@/api/ballang.api";
import { Brand } from "@/types/ballang.type";
import Link from "next/link";

async function BrandsPage() {
  const response = await ballangAPI.get(`/brands`);
  const brands = (await response.data.result) as Brand[];

  return (
    <main className="flex flex-col items-center">
      <h2 className="pt-32 text-3xl font-bold">Brands</h2>
      <strong className="mt-8 text-sm mb-5">ALL</strong>

      <ul className="text-sm text-gray-500 gap-y-5 mb-10 text-center grid grid-cols-6 w-[50vw]">
        {brands?.map((brand) => (
          <Link
            key={brand.id}
            href={{ pathname: "/brands", query: { brandId: `${brand.id}` } }}
          >
            {brand.nameKr}
          </Link>
        ))}
      </ul>
    </main>
  );
}

export default BrandsPage;
