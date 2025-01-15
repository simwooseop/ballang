import { PropsWithChildren } from "react";
import Header from "./_components/Header";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="pt-24">{children}</main>
    </>
  );
}
export default RootLayout;
