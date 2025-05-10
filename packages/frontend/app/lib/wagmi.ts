import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { base, baseSepolia, mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const getWagmiConfig: (ENV: Env) => ReturnType<typeof createConfig> = (
  ENV: Env,
) =>
  createConfig({
    chains: [mainnet, sepolia, base, baseSepolia],
    connectors: [
      coinbaseWallet({
        appName: "EPO",
        appLogoUrl: "https://epo.im/logo.png",
        preference: {
          options: "smartWalletOnly",
        },
      }),
    ],
    transports: {
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${ENV.ALCHEMY_API_KEY}`,
      ),
      [sepolia.id]: http(
        `https://eth-sepolia.g.alchemy.com/v2/${ENV.ALCHEMY_API_KEY}`,
      ),
      [base.id]: http(
        `https://api.developer.coinbase.com/rpc/v1/base/${ENV.CDP_CLIENT_API_KEY}`,
      ),
      [baseSepolia.id]: http(
        `https://api.developer.coinbase.com/rpc/v1/base-sepolia/${ENV.CDP_CLIENT_API_KEY}`,
      ),
    },
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
  });

declare module "wagmi" {
  interface Register {
    config: typeof getWagmiConfig;
  }
}
