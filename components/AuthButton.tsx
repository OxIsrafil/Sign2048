"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { initSignClient } from "../utils/signClient";
import { ethers } from "ethers";
import { isAddress } from "viem";

export default function AuthButton() {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets } = useWallets();
  const [showWarning, setShowWarning] = useState(false);

  // Initialize Sign Protocol signer
  useEffect(() => {
    const setupSignClient = async () => {
      const wallet = wallets?.[0];
      if (!wallet || !authenticated) return;

      try {
        const ethereumProvider = await wallet.getEthereumProvider();
        const provider = new ethers.BrowserProvider(ethereumProvider);
        const signer = await provider.getSigner();
        initSignClient(signer);
      } catch (err) {
        console.error("❌ Failed to initialize SignClient signer:", err);
      }
    };

    setupSignClient();
  }, [wallets, authenticated]);

  // Watch for Google-only login, and show notice
  useEffect(() => {
    const isGoogleOnly =
      !!user?.google?.email &&
      (!user.wallet?.address || !isAddress(user.wallet.address));

    if (authenticated && isGoogleOnly) {
      setShowWarning(true);
    }

    if (authenticated && !isGoogleOnly) {
      setShowWarning(false); // hide once wallet is connected
    }
  }, [authenticated, user, wallets]);

  if (!ready) return null;

  return (
    <>
      {/* Top-right auth controls */}
      <div className="absolute top-4 right-4 z-50">
        {!authenticated ? (
          <button
            onClick={login}
            className="bg-white text-orangeDynasty font-semibold px-4 py-2 rounded shadow hover:bg-gray-100"
          >
            Sign In
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <p className="text-white text-sm truncate max-w-[150px]">
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

      {/* Bottom-center warning */}
      {showWarning && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-yellow-100 text-yellow-900 font-bold text-sm px-6 py-3 rounded shadow-lg animate-pulse z-40 max-w-sm w-full text-center">
          ⚠️ Google login detected — please connect a wallet to record your score on-chain!
        </div>
      )}
    </>
  );
}
