"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect } from "react";
import { initSignClient } from "../utils/signClient"; // ✅ path depends on your structure
import { ethers } from "ethers";

export default function AuthButton() {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets } = useWallets();

  // ✅ Initialize signClient after wallet connection
 useEffect(() => {
  const wallet = wallets?.[0];

  if (wallet) {
    wallet.getEthereumProvider().then((ethereumProvider) => {
      const provider = new ethers.BrowserProvider(ethereumProvider);
      provider.getSigner().then((signer) => {
        initSignClient(signer);
      });
    });
  }
}, [wallets]);


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
