import { SignProtocolClient, EvmChains, SpMode } from "@ethsign/sp-sdk";

export const signClient = new SignProtocolClient(
  SpMode.OnChain, // Specify the mode as OnChain
  {
    chain: EvmChains.base, // ✅ MAINNET BASE
  } // Provide appropriate options for OnChainClientOptions
);


// import { SignProtocolClient, EvmChains } from "@ethsign/sp-sdk";

// export const signClient = new SignProtocolClient({ chain: EvmChains.base, // ✅ MAINNET BASE });
