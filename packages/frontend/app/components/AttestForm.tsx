import { useCallback } from "react";
import { useAccount } from "wagmi";
import ConfirmDialog from "~/components/ConfirmDialog";
import Transaction from "~/components/CustomTransaction";
import { toast } from "~/components/ui/Toaster";
import { useState } from "react";
import { base } from "viem/chains";
import { attest, EAS_CONTRACT_ADDRESS } from "~/lib/eas";
import { abi } from "~/abis/EAS";
import { useEthersSigner } from "~/lib/ethers";

const callsCallback = async (signer, data) => {
  console.log("----", signer, data, EAS_CONTRACT_ADDRESS, abi);
  const args = await attest(signer, data);

  console.log("------", args);

  return [
    {
      address: EAS_CONTRACT_ADDRESS,
      abi,
      functionName: "attest",
      args,
    },
  ];
};

export const AttestConfirmDialog = ({
  postUid,
  attesterName,
  recipientName,
  confirmOpen,
  setConfirmOpen,
}: {
  postUid: string;
  attesterName: string;
  recipientName: string;
  confirmOpen: boolean;
  setConfirmOpen: (open: boolean) => void;
}) => {
  const { address } = useAccount();
  const [message, setMessage] = useState("");
  const signer = useEthersSigner();

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    if (status.statusName === "success") {
      toast("👌 Success!");
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "message") {
      setMessage(e.targetValue);
    }
  };

  return (
    <ConfirmDialog
      open={confirmOpen}
      onOpenChange={() => setConfirmOpen(!confirmOpen)}
    >
      <form>
        <input
          className="mb-4 w-full"
          value={message ?? ""}
          placeholder="Message (optional)"
          onChange={handleChange}
        />
        <Transaction
          chainId={base.id}
          calls={callsCallback(signer, {
            recipient: address,
            attesterName,
            recipientName,
            url: `${window.location.origin}/p/${postUid}`,
            message,
          })}
          btnText="Attest"
          handleOnStatus={handleOnStatus}
        />
      </form>
    </ConfirmDialog>
  );
};

export default AttestConfirmDialog;
