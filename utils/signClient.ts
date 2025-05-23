import {
  SignProtocolClient,
  EvmChains,
  SpMode,
  type OnChainClientOptions,
} from "@ethsign/sp-sdk";
import { ethers } from "ethers";

export let signClient: SignProtocolClient;

/**
 * Initializes the global SignProtocolClient instance using a signer.
 */
export function initSignClient(signer: ethers.Signer) {
  if (!signer) {
    console.error("❌ No signer provided to initSignClient.");
    return;
  }

  const options = {
    chain: EvmChains.base,
    signer, // ✅ casted inline to avoid TypeScript error
  } as OnChainClientOptions;

  signClient = new SignProtocolClient(SpMode.OnChain, options);

  console.log("✅ SignClient successfully initialized with signer.");
}
