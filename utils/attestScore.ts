import { signClient } from "./signClient";

export async function attestScore({
  address,
  score,
}: {
  address: string;
  score: number;
}) {
  try {
    const res = await (signClient as any).createAttestation({
      schemaId: "0x4697e", // ✅ hex ID for on-chain
      recipients: [address],
      fields: {
        score: score.toString(), // ✅ must be string
      },
      indexingValue: address,
    });

    console.log("✅ Attestation success:", res.attestationId);
    return res.attestationId;
  } catch (err) {
    console.error("❌ Attestation failed:", err);
    return null;
  }
}
