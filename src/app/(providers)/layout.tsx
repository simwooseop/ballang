import { PropsWithChildren } from "react";
import AuthProvider from "./_providers/auth.provider";
import ModalProvider from "./_providers/modal.provider";
import TanstackProvider from "./_providers/tanstack.provider";

function ProvidersLayout({ children }: PropsWithChildren) {
  return (
    <TanstackProvider>
      <AuthProvider>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </TanstackProvider>
  );
}

export default ProvidersLayout;
