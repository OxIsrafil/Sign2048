import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import dotenv from "dotenv";

dotenv.config();

const main = async () => {
  const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.base,
  });

  const schemaId = "0x4697e"; // <- Use hex-only ID of your latest schema

  const result = await client.getSchema(schemaId);
  console.log("✅ Schema Found:");
  console.log(result);
};

main().catch((err) => {
  console.error("❌ Error verifying schema:", err);
  process.exit(1);
});
