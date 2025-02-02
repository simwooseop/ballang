import api from "@/api/api";
import { Product } from "@/types/supabaseCustom";
import Image from "next/image";
import Link from "next/link";
import CartButton from "./_components/CartButton";

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
          className="cover"
          src={product.imgSrc}
          alt={product.name}
          fill={true}
        />
      </section>
      <section className="flex flex-col">
        <Link
          className="underline text-gray-600/70"
          href={{
            pathname: "/brands",
            query: { brandId: `${product.brandId}` },
          }}
        >
          {product.brands.nameKr} / {product.brands.nameEn}
        </Link>
        <strong className="text-lg">{product.name}</strong>

        <span className="text-red-500 line-through mt-5">
          \{product.originalPrice.toLocaleString()}
        </span>

        <span className="text-xl">\{product.price.toLocaleString()}</span>

        <CartButton productId={product.id} />
      </section>
    </div>
  );
}

export default ProductDetailPage;
