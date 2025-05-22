import { signClient } from "./signClient";

export async function attestScore({
  address,
  score,
}: {
  address: string;
  score: number;
}) {
  try {
    const result = await (signClient as any).createAttestation({
      schemaId: "0x4697e", // ✅ use only hex
      recipients: [address],
      fields: {
        score: score.toString(), // ✅ Must be string
      },
      indexingValue: address,
    });

    console.log("✅ Attestation success:", result.attestationId);
    return result.attestationId;
  } catch (err) {
    console.error("❌ Attestation failed:", err);
    return null;
  }
}
