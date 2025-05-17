import { useAvatar } from "@coinbase/onchainkit/identity";
import { cn } from "~/lib/utils";
import { base } from "viem/chains";

export default function Avatar({
  fullname,
  className,
}: {
  fullname?: string;
  className?: string;
}) {
  if (!fullname) {
    <div className={cn("rounded-full bg-acccent", className ?? "h-6 w-6")} />;
  }

  const { data: baseAvatar, isLoading } = useAvatar({
    ensName: fullname ?? "",
    chain: base,
  });

  return (
    <div className="flex items-center">
      {isLoading || !baseAvatar ? (
        <div
          className={cn("rounded-full bg-acccent", className ?? "h-6 w-6")}
        />
      ) : (
        <img
          src={baseAvatar ?? ""}
          className={cn("rounded-full", className ?? "h-6 w-6")}
          alt={fullname ?? ""}
        />
      )}
    </div>
  );
}
