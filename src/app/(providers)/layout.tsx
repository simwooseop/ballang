import { PropsWithChildren } from "react";
import ModalProvider from "./_providers/modal.provider";
import TanstackProvider from "./_providers/tanstack.provider";

function ProvidersLayout({ children }: PropsWithChildren) {
  return (
    <TanstackProvider>
      <ModalProvider>{children}</ModalProvider>
    </TanstackProvider>
  );
}

export default ProvidersLayout;
