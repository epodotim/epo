import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { baseSepolia } from "viem/chains";
import { WagmiProvider, cookieToInitialState } from "wagmi";
import { getWagmiConfig } from "~/lib/wagmi";
import type { RootLoader } from "~/root";
import { SpinnerGap } from "@phosphor-icons/react";
import { useAccount } from "wagmi";
import { useEffect } from "react";

export function Loading() {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-50 grid place-items-center bg-gray-500/60 backdrop-blur">
      <SpinnerGap weight="bold" size="80" className="animate-spin-slow" />
    </div>
  );
}

export function AppProviders({
  children,
  ld,
}: {
  children: ReactNode;
  ld: RootLoader;
}) {
  const [wagmiConfig] = useState(() => getWagmiConfig(ld?.ENV));
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <WagmiProvider
      config={wagmiConfig}
      initialState={cookieToInitialState(wagmiConfig, ld?.cookie)}
    >
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={ld?.ENV?.CDP_CLIENT_API_KEY}
          chain={baseSepolia}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default function AppHandlers({
  ld,
  navigate,
  pathname,
  isNavigating,
}: {
  ld: RootLoader;
  navigate: (path: string) => void;
  pathname: string;
  isNavigating: boolean;
}) {
  const { isConnected, isConnecting } = useAccount();

  // redirect
  useEffect(() => {
    if (pathname !== "/" && !isConnected) {
      // navigate("/");
    }
  }, [isConnected, navigate, pathname]);

  return <>{!ld || isNavigating || (isConnecting && <Loading />)}</>;
}
