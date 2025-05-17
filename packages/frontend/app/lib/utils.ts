import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const shortAddr = (address: `0x${string}` | undefined, prefix = 8, suffix = 4) => {
  if (!address) return ''
  return `${address.substring(0, prefix + 1)}...${address.substring(address.length - suffix)}`
}

export const getImageUrl = (url: string | undefined) => {
  if (!url) return "";
  return url.startsWith("ipfs://")
    ? url.replace("ipfs://", "https://ipfs.io/ipfs/")
    : url;
};

export const parseName = (
  ensName: string | undefined,
): { id: string; subname: string } => {
  if (!ensName) return { id: "", subname: "" };
  const parts = ensName.split(".");
  const id = parts[0];
  const subname = parts.length > 2 ? parts[1] : "";
  return { id, subname };
};

export const isStandalone = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true);
