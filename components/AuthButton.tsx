"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect } from "react";
import { initSignClient } from "../utils/signClient"; // ✅ ensure correct path
import { ethers } from "ethers";

export default function AuthButton() {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets } = useWallets();

  // ✅ Re-init signClient with signer after login and wallet available
  useEffect(() => {
    const setupSignClient = async () => {
      const wallet = wallets?.[0];
      if (!wallet || !authenticated) return;

      try {
        const ethereumProvider = await wallet.getEthereumProvider();
        const provider = new ethers.BrowserProvider(ethereumProvider);
        const signer = await provider.getSigner();

        initSignClient(signer); // ✅ inject signer into Sign SDK
      } catch (err) {
        console.error("❌ Failed to initialize SignClient signer:", err);
      }
    };

    setupSignClient();
  }, [wallets, authenticated]);

  if (!ready) return null;

  return (
    <div className="absolute top-4 right-4">
      {!authenticated ? (
        <button
          onClick={login}
          className="bg-white text-orangeDynasty font-semibold px-4 py-2 rounded shadow hover:bg-gray-100"
        >
          Sign In
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <p className="text-white text-sm">
            {user?.google?.email || wallets?.[0]?.address.slice(0, 8) + "..."}
          </p>
          <button
            onClick={logout}
            className="bg-white text-orangeDynasty font-semibold px-3 py-1 rounded shadow hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
