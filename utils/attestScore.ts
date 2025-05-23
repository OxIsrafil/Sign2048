import { signClient } from "./signClient";
import { checksumAddress } from "viem"; // ✅ ensures valid on-chain address format

export async function attestScore({
  address,
  score,
}: {
  address?: string;
  score: number;
}) {
  const safeScore =
    score !== undefined && !isNaN(score) ? String(score) : null;

  // Block submission if no valid wallet address
  if (!address || !address.startsWith("0x") || !safeScore) {
    console.warn("❌ Cannot attest: No wallet or invalid score", {
      address,
      score,
    });
    return null;
  }

  const checksummed = checksumAddress(address as `0x${string}`);

  console.log("📤 Attesting from attestScore.ts");
  console.log("🔥 Address:", checksummed);
  console.log("🔥 Score:", safeScore);

  try {
    const res = await signClient.createAttestation({
      schemaId: "0x46982", // ✅ your Sign2048 schema with `data`
      recipients: [checksummed],
      data: {
        score: safeScore,
      },
      indexingValue: checksummed,
    });

    console.log("✅ Attestation success:", res.attestationId);
    return res.attestationId;
  } catch (err) {
    console.error("❌ Attestation failed:", err);
    return null;
  }
}
