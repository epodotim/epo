import { useQuery } from "@tanstack/react-query";
import { orderBy } from "es-toolkit";
import { gql, request } from "graphql-request";
import { EAS_SCHEMA_ADDRESS } from "~/lib/eas";

export function useAttestations(address: string) {
  const { data } = useQuery({
    queryKey: ["AttestationsQuery", EAS_SCHEMA_ADDRESS, address],
    queryFn: async () =>
      request("https://base-sepolia.easscan.org/graphql", AttestationsQuery, {
        id: EAS_SCHEMA_ADDRESS,
      }),
  });

  return {
    data: orderBy(data?.schema?.attestations ?? [], ["timeCreated"], ["desc"]),
  };
}

export const AttestationsQuery = gql`
  query Attestation($id: String!) {
    schema(where: { id: $id }) {
      id
      attestations {
        attester
        data
        id
        decodedDataJson
        recipient
        time
        timeCreated
        expirationTime
        revocationTime
        refUID
        revocable
        revoked
        txid
        schemaId
        ipfsHash
        isOffchain
      }
      revocable
      time
      schema
    }
  }
`;

export const AttestationQuery = gql`
  query Attestation($id: String!) {
    attestation(where: { id: $id }) {
      attester
      data
      id
      decodedDataJson
      recipient
      time
      timeCreated
      expirationTime
      revocationTime
      refUID
      revocable
      revoked
      txid
      schemaId
      ipfsHash
      isOffchain
    }
  }
`;
