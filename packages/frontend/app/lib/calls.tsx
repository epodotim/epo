import { namehash, normalize } from "viem/ens";
import { abi as REGISTRAR_ABI } from "~/abis/L2Registrar";
import { abi as REGISTRY_ABI } from "~/abis/L2Registry";
import { abi as REVERSE_REGISTRY_ABI } from "~/abis/L2ReverseResolver";
import { abi as REVERSE_REGISTRY2_ABI } from "~/abis/L2ReverseResolver2";

// BASE SEPOLIA
export const L2_REGISTRY_ADDRESS = "0x10f609f3a940c065afa3e0ee034e9812092b2d39";
export const L2_REGISTRAR_ADDRESS =
  "0x22d99f3e0caf06db1335f6f0fcdee5ad19b84e2b";
export const L2_REVERSE_REGISTRY_ADDRESS =
  "0xa12159e5131b1eEf6B4857EEE3e1954744b5033A";
export const L2_REVERSE_REGISTRY2_ADDRESS =
  "0x00000BeEF055f7934784D6d81b6BC86665630dbA";
// const L2_REGISTRY_ADDRESS = "0xde364581c00a929edbf80cabbd6aaafb7f2edf62";

export const TEXT_KEYS = [
  "name",
  "description",
  "avatar",
  "com.twitter",
  "com.github",
  "xyz.farcaster",
  "com.instagram",
  "id.fkey",
  "url",
  "url2",
  "url3",
  "url4",
  "blog",
  "skills",
];

export const TEXT_FORM_KEYS = [
  "name",
  "description",
  "avatar",
  "com.twitter",
  "com.github",
  "xyz.farcaster",
  "com.instagram",
  "id.fkey",
  "url",
  "url2",
  "url3",
  "url4",
  "skills",
];

export const SKILLS = [
  "Solidity",
  "Rust",
  "Security",
  "Javascript",
  "Typescript",
  "Go",
  "Game development",
  "Data",
  "UI/UX",
  "Prototyping",
  "Research",
  "Music",
  "Illustration",
  "Writing",
  "Video",
  "Graphic design",
  "Animation",
  "Visual design",
  "Design",
  "Digital art",
  "Photography",
  "Community",
  "Product management",
  "Strategy",
  "Business development",
  "Legal",
  "Marketing",
];

export const registerCalls = (
  owner: `0x${string}` | undefined,
  label: string
) =>
  !!owner && !!label
    ? [
        {
          address: L2_REGISTRAR_ADDRESS,
          abi: REGISTRAR_ABI,
          functionName: "register",
          args: [label, owner],
        },
        {
          address: L2_REVERSE_REGISTRY2_ADDRESS,
          abi: REVERSE_REGISTRY2_ABI,
          functionName: "setNameForAddr",
          args: [owner, normalize(`${label}.epo.eth`)],
        },
      ]
    : [];

const convertUnderscoreToDot = (key: string): string =>
  key.includes("_") ? key.replace(/_/g, ".") : key;

const removeEmptyValues = <T extends Record<string, any>>(obj: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== "")
  ) as Partial<T>;

export const setTextCalls = (
  id: string | undefined,
  vals:
    | {
        key: string;
        value: string;
      }[]
    | undefined
) => {
  if (!id || !vals) return [];
  return Object.entries(removeEmptyValues(vals)).map(([key, value]) => ({
    address: L2_REGISTRY_ADDRESS,
    abi: REGISTRY_ABI,
    functionName: "setText",
    args: [namehash(`${id}.epo.eth`), convertUnderscoreToDot(key), value],
  }));
};
