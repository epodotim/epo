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
