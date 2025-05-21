import { signClient } from "./signClient";

export async function attestScore({
  address,
  score,
}: {
  address: string;
  score: number;
}) {
  try {
    const result = await signClient.createAttestation({
      schemaId: "onchain_evm_8453_0x46976", // live schema ID here
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

    console.log("✅ Attestation success:", result.attestationId);
    return result.attestationId;
  } catch (err) {
    console.error("❌ Attestation failed:", err);
    return null;
  }
}
