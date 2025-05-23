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

  signClient = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.base,
    signer,
  } as OnChainClientOptions);

  console.log("✅ SignClient initialized with signer:", signClient);
}
