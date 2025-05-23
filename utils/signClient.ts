import {
  SignProtocolClient,
  EvmChains,
  SpMode,
  OnChainClientOptions,
} from "@ethsign/sp-sdk";
import { ethers } from "ethers";

// Global instance shared across the app
export let signClient: SignProtocolClient;

/**
 * Initialize SignProtocolClient with injected signer from wallet.
 */
export function initSignClient(signer: ethers.Signer) {
  if (!signer) {
    console.error("❌ Signer is undefined. SignClient not initialized.");
    return;
  }

  const options: OnChainClientOptions = {
    chain: EvmChains.base, // ✅ Mainnet Base
  };

  signClient = new SignProtocolClient(SpMode.OnChain, options);
  (options as any).signer = signer; // Add the signer to the options with type assertion

  signClient = new SignProtocolClient(SpMode.OnChain, options);

  console.log("✅ SignClient initialized with signer:", signClient);
}
