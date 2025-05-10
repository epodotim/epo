import { OnchainKitProvider } from "@coinbase/onchainkit";
import { SpinnerGap } from "@phosphor-icons/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { useEffect } from "react";
import { baseSepolia } from "viem/chains";
import { WagmiProvider, cookieToInitialState } from "wagmi";
import { useAccount } from "wagmi";
import { Toaster } from "~/components/ui/Toaster";
import { getWagmiConfig } from "~/lib/wagmi";
import type { RootLoader } from "~/root";

export function Loading() {
	return (
		<div className="fixed top-0 right-0 bottom-0 left-0 z-50 grid place-items-center bg-gray-400/10 backdrop-blur-sm">
			<SpinnerGap
				weight="bold"
				size="80"
				className="animate-spin-slow text-accent/80"
			/>
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
					<Toaster />
				</OnchainKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}

export function AppHandlers({
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
	}, [isConnected, pathname]);

	return <>{!ld || isNavigating || (isConnecting && <Loading />)}</>;
}
