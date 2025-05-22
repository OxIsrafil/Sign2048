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
      schemaId: "0x4697e", // ✅ must be hex-only for onchain
      recipients: [address],
      data: [
        {
          name: "score",
          type: "string",
          value: score.toString(),
        },
      ],
      indexingValue: address,
    });

    console.log("✅ Attestation success:", res.attestationId);
    return res.attestationId;
  } catch (err) {
    console.error("❌ Attestation failed:", err);
    return null;
  }
}
