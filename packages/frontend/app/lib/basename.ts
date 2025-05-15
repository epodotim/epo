import L2_BASENAME_RESOLVER_ABI from "@epoim/shared/abis/L2BasenamesResolver";
import {
  http,
  type Address,
  type ContractFunctionParameters,
  createPublicClient,
  encodePacked,
  keccak256,
  namehash,
} from "viem";
import { base, mainnet } from "viem/chains";

export type Basename = `${string}.base.eth`;

export const BASENAME_L2_RESOLVER_ADDRESS =
  "0xC6d566A56A1aFf6508b41f6c90ff131615583BCD";

export enum BasenameTextRecordKeys {
  Description = "description",
  Name = "name",
  Keywords = "keywords",
  Url = "url",
  Url2 = "url2",
  Url3 = "url3",
  Email = "email",
  Phone = "phone",
  Github = "com.github",
  Twitter = "com.twitter",
  Farcaster = "xyz.farcaster",
  Lens = "xyz.lens",
  Telegram = "org.telegram",
  Discord = "com.discord",
  Avatar = "avatar",
  Location = "location",
}

export const textRecordsKeysEnabled = [
  BasenameTextRecordKeys.Description,
  BasenameTextRecordKeys.Keywords,
  BasenameTextRecordKeys.Name,
  BasenameTextRecordKeys.Url,
  BasenameTextRecordKeys.Url2,
  BasenameTextRecordKeys.Url3,
  BasenameTextRecordKeys.Github,
  // BasenameTextRecordKeys.Email,
  // BasenameTextRecordKeys.Phone,
  BasenameTextRecordKeys.Twitter,
  BasenameTextRecordKeys.Farcaster,
  BasenameTextRecordKeys.Lens,
  BasenameTextRecordKeys.Telegram,
  BasenameTextRecordKeys.Discord,
  BasenameTextRecordKeys.Avatar,
  BasenameTextRecordKeys.Location,
];

const baseClient = createPublicClient({
  chain: base,
  transport: http("https://mainnet.base.org"),
});

export async function getBasenameAvatar(basename: Basename) {
  const avatar = await baseClient.getEnsAvatar({
    name: basename,
    universalResolverAddress: BASENAME_L2_RESOLVER_ADDRESS,
  });

  return avatar;
}

export function buildBasenameTextRecordContract(
  basename: Basename,
  key: BasenameTextRecordKeys,
): ContractFunctionParameters {
  return {
    abi: L2_BASENAME_RESOLVER_ABI,
    address: BASENAME_L2_RESOLVER_ADDRESS,
    args: [namehash(basename), key],
    functionName: "text",
  };
}

// Get a single TextRecord
export async function getBasenameTextRecord(
  basename: Basename,
  key: BasenameTextRecordKeys,
) {
  try {
    const contractParameters = buildBasenameTextRecordContract(basename, key);
    const textRecord = await baseClient.readContract(contractParameters);
    return textRecord as string;
  } catch (error) {
    console.log("error:", error);
  }
}

// Get a all TextRecords
export async function getBasenameTextRecords(basename: Basename) {
  try {
    const readContracts: ContractFunctionParameters[] =
      textRecordsKeysEnabled.map((key) =>
        buildBasenameTextRecordContract(basename, key),
      );
    const textRecords = await baseClient.multicall({
      contracts: readContracts,
    });

    return textRecordsKeysEnabled
      .map((key, index) => ({
        key,
        value: textRecords[index]?.result ?? "",
      }))
      .filter((record) => !!record.value)
      .reduce(
        (acc, record) => {
          acc[record.key] = record.value;
          return acc;
        },
        {} as { [key: string]: string },
      );
  } catch (error) {
    console.log("error:", error);
  }
}

/**
 * Convert an chainId to a coinType hex for reverse chain resolution
 */
export const convertChainIdToCoinType = (chainId: number): string => {
  // L1 resolvers to addr
  if (chainId === mainnet.id) {
    return "addr";
  }

  const cointype = (0x80000000 | chainId) >>> 0;
  return cointype.toString(16).toLocaleUpperCase();
};

/**
 * Convert an address to a reverse node for ENS resolution
 */
export const convertReverseNodeToBytes = (
  address: Address,
  chainId: number,
) => {
  const addressFormatted = address.toLocaleLowerCase() as Address;
  const addressNode = keccak256(addressFormatted.substring(2) as Address);
  const chainCoinType = convertChainIdToCoinType(chainId);
  const baseReverseNode = namehash(
    `${chainCoinType.toLocaleUpperCase()}.reverse`,
  );
  const addressReverseNode = keccak256(
    encodePacked(["bytes32", "bytes32"], [baseReverseNode, addressNode]),
  );
  return addressReverseNode;
};

export async function getBasename(address: Address) {
  try {
    const addressReverseNode = convertReverseNodeToBytes(address, base.id);
    const basename = await baseClient.readContract({
      abi: L2_BASENAME_RESOLVER_ABI,
      address: BASENAME_L2_RESOLVER_ADDRESS,
      functionName: "name",
      args: [addressReverseNode],
    });
    if (basename) {
      return basename as Basename;
    }
  } catch (error) {
    console.log("error:", error);
  }
}
