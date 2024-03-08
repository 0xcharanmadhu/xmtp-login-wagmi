"use client"

import styles from "./page.module.css";
import { ConnectKitButton } from "connectkit";
import { useAccount } from 'wagmi';
import { loadKeys,storeKeys } from "./XMTPHelpers";
import { useCallback } from "react";
import { useClient,Client } from "@xmtp/react-sdk";
import { useWalletClient } from "wagmi";

export default function Home() {

  const { isConnected, address, connector } = useAccount();
  const { initialize } = useClient();
    const { data: walletClient } = useWalletClient();
    const {address:accountAddress} = useAccount();

  const handleConnect = useCallback(async () => {
    try {
      const options = {
        env: "dev"
      };
      await initialize({
        keys: undefined,
        options: {
          env: "dev"
        },
        signer: walletClient,
      });

      const address = accountAddress; // Assuming address is accessible from walletClient
      if (address) {
          const keys = await Client.getKeys(walletClient, {
              ...options,
              skipContactPublishing: true,
              persistConversations: false,
          });
          storeKeys(address, keys);
          await initialize({ keys, ...options, walletClient });
          console.log("XMTP Keys Stored")
      }
    } catch (error) {
      console.error("Error initializing XMTP:", error);
    }
  }, [initialize, walletClient]);

  return (
    <>
      <ConnectKitButton />

    {isConnected && 
      <button onClick={handleConnect}>
        XMTP Login
      </button>
    }
      
    </>
  );
}
