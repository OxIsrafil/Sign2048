"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PrivyAuthProvider({ children }: Props) {
  return (
    <PrivyProvider
      appId="cmaxvl11i00obl40la1lfgskb"
      config={{
        loginMethods: ["wallet", "google"], // ✅ Support both
        embeddedWallets: {
          createOnLogin: "users-without-wallets", // ✅ auto-create if needed
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
