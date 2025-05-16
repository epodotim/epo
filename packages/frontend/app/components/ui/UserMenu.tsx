import Menu, { MenuItem } from "~/components/ui/Menu";
import {
  UserCircle,
  SignIn,
  SignOut,
  FilePlus,
  Files,
} from "@phosphor-icons/react";
import { useAccount, useDisconnect, useConnect } from "wagmi";
import { shortAddr, cn } from "~/lib/utils";
import FaceIdIcon from "~/components/icons/FaceId";
import { Link } from "react-router";

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

export const SIDE_MENUS = [
  {
    id: "account",
    icon: <UserCircle size={22} />,
    text: "Account",
    href: "/account",
  },
  {
    id: "myPosts",
    icon: <Files size={22} />,
    text: "My Posts",
    href: "/account/posts",
  },
  {
    id: "newPost",
    icon: <FilePlus size={22} />,
    text: "New Post",
    href: "/account/posts/new",
  },
];

const SignedinModal = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col">
      <div className="border-c2 border-b py-3 text-center">xxx.base.eth</div>
      <div className="border-c2 border-b">
        {SIDE_MENUS.map(({ id, icon, text, href }) => (
          <MenuItem className="hover:cursor-pointer" key={id}>
            <Link
              to={href}
              className={cn(
                "hover-bg-c1 flex w-full min-w-40 items-center px-4 py-2 hover:cursor-pointer"
              )}
            >
              <span className="mr-2">{icon}</span>
              <span className="text-sm">{text}</span>
            </Link>
          </MenuItem>
        ))}
      </div>
      <div className="px-4 py-4">
        <input
          type="text"
          className="w-full font-sm"
          readOnly
          value={shortAddr(address)}
        />
      </div>
      <div className="px-4 pb-4">
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
