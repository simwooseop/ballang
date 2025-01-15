import api from "@/api/api";
import Image from "next/image";

async function HomePage() {
  const products = await api.product.getProducts();

  if (!products) return <span>데이터를 불러오는 중...</span>;

  return (
    <ul className="max-w-[1200px] mx-auto h-screen grid grid-cols-6">
      {products.map((product) => (
        <li
          className="aspect-square border border-black relative"
          key={product.id}
        >
          <Image
            src={product.imgSrc}
            alt={product.imgSrc}
            fill={true}
            objectFit="cover"
          />
        </li>
      ))}
    </ul>
  );
}

export default HomePage;
