"use client";

import { WagmiProvider, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  mainnet,
  polygon,
  optimism,
  bsc,
  arbitrum,
  avalanche,
  celo,
  polygonMumbai,
} from "viem/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { XMTPProvider } from "@xmtp/react-sdk";

const config = createConfig(
  getDefaultConfig({
    appName: "tempApp",
    chains: [
      mainnet,
      polygon,
      optimism,
      bsc,
      arbitrum,
      avalanche,
      celo,
      polygonMumbai,
    ],
    appDescription: "tempApp",
    appUrl: "https://tempApp.io",
  })
);

const queryClient = new QueryClient();

export default function LayoutConfig({ children }) {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider
            theme="midnight"
            customTheme={{
              "--ck-font-family": '"Quicksand", sans-serif',
            }}
          >
            <XMTPProvider>{children}</XMTPProvider>
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
