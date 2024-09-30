import ProductList from "./_components/ProductList";

async function HomePage() {
  return (
    <main className="text-center">
      <h2 className="pt-32 text-3xl font-bold">Trending</h2>
      <ProductList />
    </main>
  );
}

export default HomePage;
