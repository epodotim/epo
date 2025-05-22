import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { EAS_SCHEMA_ADDRESS } from "~/lib/eas";

export function useAttestations(search: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["AttestationsQuery", EAS_SCHEMA_ADDRESS, search],
    queryFn: async () =>
      request("https://base-sepolia.easscan.org/graphql", AttestationsQuery, {
        schemaId: EAS_SCHEMA_ADDRESS,
        search,
      }),
  });

  return {
    isLoading,
    data:
      data?.attestations?.map((attestation) => {
        const decoded = JSON.parse(attestation.decodedDataJson);
        const dataJson = decoded.reduce((acc: any, item: any) => {
          acc[item.name] = item.value.value;
          return acc;
        }, {} as any);

        return {
          ...attestation,
          ...dataJson,
          decodedDataJson: decoded,
        };
      }) ?? [],
  };
}

export const AttestationsQuery = gql`
  query Attestations($schemaId: String!, $search: String!) {
    attestations(
      where: {
        schemaId: { equals: $schemaId }
        decodedDataJson: { contains: $search }
      }
      orderBy: { timeCreated: desc }
    ) {
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
