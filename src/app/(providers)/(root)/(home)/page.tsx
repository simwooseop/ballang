import api from "@/api/api";
import { ProductPage } from "@/types/supabaseCustom";
import ProductList from "../_components/ProductList";

async function HomePage() {
  const initialProducts = (await api.product.getInfiniteProducts(
    0
  )) as ProductPage;

  if (!initialProducts) return <span>데이터를 불러오는 중...</span>;

  return (
    <div className="max-w-[1200px] mx-auto h-screen">
      <h1 className="text-3xl text-center mb-5">BALLANG</h1>
      <ProductList initialProducts={initialProducts} />;
    </div>
  );
}

export default HomePage;
