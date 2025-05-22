import { SignProtocolClient, EvmChains, SpMode, OnChainClientOptions } from "@ethsign/sp-sdk";
import { ethers } from "ethers";

export let signClient: SignProtocolClient;

export function initSignClient(signer: ethers.Signer) {
  signClient = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.base,
    signer,
  } as OnChainClientOptions);
}
