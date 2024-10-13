import { useWalletStore } from "@/store/wallet.store";
import { useConnect, useDisconnect } from "@starknet-react/core";
import { toast } from "sonner";
import { Connector } from "starknetkit";

export const useConnectWallet = () => {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const setWalletAddress = useWalletStore((state) => state.setWalletAddress);
  const setCurrentConnector = useWalletStore(
    (state) => state.setCurrentConnector,
  );
  const setIsWalletConnected = useWalletStore(
    (state) => state.setIsWalletConnected,
  );

  async function connectWallet(connector: Connector) {
    try {
      if (connector.available()) {
        connectAsync({ connector });
        setIsWalletConnected(true);
        setCurrentConnector({
          id: connector?.id,
          name: connector?.name,
          icon: connector?.icon,
        });
      }
    } catch (err: unknown) {
      console.log("[SOMETHING WENT WRONG]", err);
      toast.error(
        err instanceof Error ? err.message : "[SOMETHING WENT WRONG]",
      );
    }
  }

  async function disconnectWallet() {
    try {
      await disconnectAsync();
      setCurrentConnector(undefined);
      setWalletAddress(undefined);
      setIsWalletConnected(false);
    } catch (err: unknown) {
      console.log("[SOMETHING WENT WRONG]", err);
      toast.error(
        err instanceof Error ? err.message : "[SOMETHING WENT WRONG]",
      );
    }
  }

  return { connectWallet, disconnectWallet };
};
