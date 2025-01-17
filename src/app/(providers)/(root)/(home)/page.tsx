import api from "@/api/api";
import { Product } from "@/types/supabaseCustom";
import Image from "next/image";
import Link from "next/link";

async function HomePage() {
  const products = (await api.product.getProducts()) as Product[];

  if (!products) return <span>데이터를 불러오는 중...</span>;

  return (
    <ul className="max-w-[1200px] mx-auto h-screen grid gap-4 grid-cols-5">
      {products.map((product) => (
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
            <strong>{product.brands.nameKr}</strong>
            <span>{product.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default HomePage;
