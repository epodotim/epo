import Menu from "~/components/ui/Menu";
import { UserCircle, SignIn, SignOut } from "@phosphor-icons/react";
import { useAccount, useDisconnect, useConnect } from "wagmi";
import { shortAddr } from "~/lib/utils";
import FaceIdIcon from "~/components/icons/FaceId";

const SignupModal = () => {
  const { connect, connectors } = useConnect();

  return (
    <div className="flex flex-col">
      <p className="flex items-center justify-center gap-1.5 border-c2 border-b p-4">
        <SignIn size={22} />
        Signin
      </p>
      <div className="flex flex-col space-y-2 px-6 py-3">
        <button
          type="button"
          className="btn mt-2 w-full px-8 font-bold text-sm"
          onClick={() =>
            connect({ connector: connectors.find((x) => x.id === "injected") })
          }
        >
          I have Wallet /w{" "}
          <span className="mr-0.5 inline-block h-2 w-2 rounded-full bg-[#0052FF]" />
          Basenames
        </button>
        <p className="text-center text-sm opacity-60">or</p>
        <button
          type="button"
          className="btn mb-2 flex w-full items-center justify-center space-x-1.5 px-8 font-bold text-sm"
          onClick={() =>
            connect({
              connector: connectors.find((x) => x.id === "coinbaseWalletSDK"),
            })
          }
        >
          Wallet /w <FaceIdIcon className="mr-0.5 ml-1 h-5 w-5" />
          Passkey
        </button>
      </div>
    </div>
  );
};

const SignedinModal = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col gap-2.5 p-4">
      <div className="text-center">xxx.base.eth</div>
      <input
        type="text"
        className="w-full font-sm"
        readOnly
        value={shortAddr(address)}
      />
      <button
        type="button"
        className="btn flex w-full min-w-40 items-center justify-center space-x-1.5 font-bold text-sm"
        onClick={() => {
          disconnect();
        }}
      >
        <SignOut size={22} />
        Disconnect
      </button>
    </div>
  );
};

export default function CustomMenu() {
  const { address } = useAccount();
  return (
    <Menu renderTrigger={<UserCircle size={22} />}>
      {!address ? <SignupModal /> : <SignedinModal />}
    </Menu>
  );
}
