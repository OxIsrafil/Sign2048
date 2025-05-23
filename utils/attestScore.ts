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
      schemaId: "0x4697e", // ✅ hex format only
      recipients: [address],
      fields: [
        {
          name: "score",
          type: "string",
          value: safeScore,
        },
      ],
      indexingValue: address,
    });

    console.log("✅ Attestation success:", res.attestationId);
    return res.attestationId;
  } catch (err) {
    console.error("❌ Attestation failed in attestScore.ts:", err);
    return null;
  }
}
