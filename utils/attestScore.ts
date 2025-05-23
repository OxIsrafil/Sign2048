import { signClient } from "./signClient";

export async function attestScore({
  address,
  score,
}: {
  address: string;
  score: number;
}) {
  const safeScore = score !== undefined && !isNaN(score) ? String(score) : null;

  if (!address || !safeScore) {
    console.warn("⚠️ Invalid address or score:", address, score);
    return null;
  }

  console.log("📤 Attesting from attestScore.ts");
  console.log("🔥 Address:", address, typeof address);
  console.log("🔥 Score:", safeScore, typeof safeScore);
  console.log("🔥 SignClient:", signClient);

  try {
    const res = await (signClient as any).createAttestation({
      schemaId: "0x46982", // ✅ Correct schema for `fields` object
      recipients: [address],
      fields: {
        score: safeScore, // ✅ Must match schema format
      },
      indexingValue: address,
    });

    console.log("✅ Attestation success:", res.attestationId);
    return res.attestationId;
  } catch (err) {
    console.error("❌ Attestation failed in attestScore.ts:", err);
    return null;
  }
}
