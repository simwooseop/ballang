import api from "@/api/api";
import { Product } from "@/types/supabaseCustom";
import Image from "next/image";
import Link from "next/link";
import AddCartButton from "./_components/AddCartButton";

interface ProductDetailPageProps {
  params: Promise<{ productId: string }>;
}

async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { productId } = await params;
  const product = (await api.product.getProduct(productId)) as Product;
  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-2 gap-10">
      <section className="w-[30vw] h-[70vh] relative">
        <Image
          className="contain"
          src={product.imgSrc}
          alt={product.name}
          fill={true}
        />
      </section>
      <section className="flex flex-col gap-y-2">
        <strong className="text-lg">{product.name}</strong>
        <Link
          className="underline text-gray-600/70"
          href={{
            pathname: "/brands",
            query: { brandId: `${product.brandId}` },
          }}
        >
          {product.brands.nameKr}
        </Link>
        <div className="mt-3 text-lg">
          <span>\{product.price.toLocaleString()}</span>

          <span className="text-red-500 line-through pl-3">
            \{product.originalPrice.toLocaleString()}
          </span>
        </div>

        <AddCartButton />
      </section>
    </div>
  );
}

export default ProductDetailPage;
