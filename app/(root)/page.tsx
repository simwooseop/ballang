import ballangAPI from "@/api/ballang.api";
import ProductList from "./_components/ProductList";

async function HomePage() {
  const products = await ballangAPI.getProducts();

  return (
    <main className="text-center">
      <h2 className="pt-32 text-3xl font-bold">Trending</h2>

      <ProductList initialProducts={products!} />
    </main>
  );
}

export default HomePage;
