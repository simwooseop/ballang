import { PropsWithChildren } from "react";
import Header from "./_components/Header";
import ModalProvider from "./_providers/ModalProvider";
import TanstackProvider from "./_providers/TanstackProvider";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <TanstackProvider>
      <ModalProvider>
        <Header />
        {children}
      </ModalProvider>
    </TanstackProvider>
  );
}

export default RootLayout;
