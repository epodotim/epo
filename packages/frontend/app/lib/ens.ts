export const parseName = (
  ensName: string | undefined,
): { id: string; subname: string } => {
  if (!ensName) return { id: "", subname: "" };
  const parts = ensName.split(".");
  const id = parts[0];
  const subname = parts.length > 2 ? parts[1] : "";
  return { id, subname };
};
