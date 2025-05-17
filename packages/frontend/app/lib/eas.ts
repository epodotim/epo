import {
  EAS,
  NO_EXPIRATION,
  SchemaEncoder,
} from "@ethereum-attestation-service/eas-sdk";

export const EAS_CONTRACT_ADDRESS = "0x4200000000000000000000000000000000000021";
export const EAS_SCHEMA_ADDRESS = "0x778e59b311ae77482bebbd7d8a3b6b1c6183b678a26b389fe14f3d7d26bbe23d"

export const attest = async (signer: any, data: any) => {
  const eas = new EAS(EAS_CONTRACT_ADDRESS);
  await eas.connect(signer);

  const schemaEncoder = new SchemaEncoder(
    "string attesterName,string recipientName,string url,string message",
  );
  const encodedData = schemaEncoder.encodeData([
    { name: "attesterName", value: data.attesterName, type: "string" },
    { name: "recipientName", value: data.recipientName, type: "string" },
    { name: "url", value: data.url, type: "string" },
    { name: "message", value: data.message, type: "string" },
  ]);

  // const tx = await eas.attest({
  //   schema: EAS_SCHEMA_ADDRESS,
  //   data: {
  //     recipient: data.recipient,
  //     expirationTime: NO_EXPIRATION,
  //     revocable: true,
  //     data: encodedData,
  //   },
  // });

  // const uid = await tx.wait();

  return {
    schema: EAS_SCHEMA_ADDRESS,
    data: {
      recipient: data.recipient,
      expirationTime: NO_EXPIRATION,
      revocable: true,
      data: encodedData,
    },
  };
};
