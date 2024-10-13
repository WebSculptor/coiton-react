import { Button } from "@/components/ui/button";
import { truncateAddr } from "@/lib/utils";
import { useWalletStore } from "@/store/wallet.store";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { Connector } from "starknetkit";

export default function ConnectWallet() {
  const { address, status } = useAccount();
  const { connectors, isPending, pendingConnector } = useConnect();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const walletAddress = useWalletStore((state) => state.walletAddress);
  const isWalletConnected = useWalletStore((state) => state.isWalletConnected);
  const currentConnector = useWalletStore((state) => state.currentConnector);
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

  const handleConnectWallet = useCallback(
    (connector: Connector) => {
      connectWallet(connector);
    },
    [connectWallet],
  );

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    }
  }, [address]);

  useEffect(() => {
    if (status === "disconnected") {
      const storedConnector = currentConnector ? currentConnector?.id : null;

      if (storedConnector) {
        const matchingConnector = connectors.find(
          (connector) => connector.id === storedConnector,
        );
        if (matchingConnector) {
          connectWallet(matchingConnector);
        }
      }
    }
  }, [status, connectors, walletAddress]);

  return connectors.map((connector) => {
    const isConnected = currentConnector?.id === connector.id;
    const isLoading = isPending && pendingConnector?.id === connector.id;
    const connectorIcon = currentConnector?.icon || connector?.icon;

    return (
      <Button
        key={connector?.id}
        isLoading={isLoading}
        variant={isConnected ? "black" : "default"}
        txt="Connecting..."
        className="h-12"
        onClick={
          isConnected
            ? async () => await disconnectWallet()
            : async () => handleConnectWallet(connector)
        }
        disabled={
          (isPending && pendingConnector?.id !== connector.id) ||
          (!isConnected && isWalletConnected)
        }
      >
        {(isConnected || isLoading) && connectorIcon && (
          <img
            src={String(connectorIcon)}
            alt={connector.name || "Connector Icon"}
            width={24}
            height={24}
            className="mr-2 size-6 object-contain"
          />
        )}
        {isConnected
          ? `Disconnect ${truncateAddr(walletAddress)}`
          : `Connect ${connector.name}`}
      </Button>
    );
  });
}
