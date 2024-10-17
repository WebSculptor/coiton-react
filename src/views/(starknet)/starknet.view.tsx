import { contract } from "@/lib/contract";
import { useWalletStore } from "@/store/wallet.store";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { Check } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Connector } from "starknetkit";
import ReadFunctions from "./_components/read-functions";
import WriteFunctions from "./_components/write-functions";

export default function StarknetView() {
  const { contractAbi } = contract;

  const categorizedFunctions = contractAbi
    .filter((item) => item.type === "interface")
    .reduce<CategorizedFunctions>(
      (acc, fn) => {
        fn.items.forEach((item) => {
          if (item.type === "function") {
            const key: "read" | "write" =
              item.state_mutability === "view" ? "read" : "write";
            acc[key].push(item);
          }
        });
        return acc;
      },
      { read: [], write: [] },
    );

  return (
    <div className="flex flex-col gap-4">
      <ConnectWallet />

      <Functions functions={categorizedFunctions} />
    </div>
  );
}

function ConnectWallet() {
  const connectorsInfo = [
    {
      id: "argentX",
      name: "Argent X",
      installLink:
        "https://chromewebstore.google.com/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb",
    },
    {
      id: "braavos",
      name: "Braavos",
      installLink:
        "https://chromewebstore.google.com/detail/braavos-starknet-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma",
    },
  ];

  const { address, status } = useAccount();
  const { connectors, connectAsync, connector } = useConnect();
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

  return (
    <div className="flex items-center gap-4">
      {isWalletConnected ? (
        <div className="flex w-full items-center justify-between border border-[#c7f39f] bg-[#f3ffef] p-4 text-[#0d633a]">
          <p className="flex items-center font-sans_medium">
            <Check className="mr-2 size-5" />
            <span>
              Connected {connector?.name}: {address}
            </span>
          </p>

          <p
            className="font-sans_bold underline"
            role="button"
            onClick={disconnectWallet}
          >
            Disconnect
          </p>
        </div>
      ) : (
        connectorsInfo.map((connectorInfo) => {
          const connector = connectors.find((c) => c.id === connectorInfo.id);

          return (
            <div key={connectorInfo.id} className="flex h-[58px] items-center">
              {connector ? (
                <button
                  className="flex cursor-pointer items-center justify-center rounded-none border border-border/30 px-5 py-1.5 font-semibold tracking-wide hover:bg-secondary/80"
                  onClick={() => handleConnectWallet(connector)}
                >
                  Connect {connectorInfo.name} wallet
                </button>
              ) : (
                <Link
                  to={connectorInfo.installLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center justify-center rounded-none border border-border/30 px-5 py-1.5 font-semibold tracking-wide hover:bg-secondary/80"
                >
                  Install {connectorInfo.name} wallet
                </Link>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

function Functions({ functions }: { functions: CategorizedFunctions }) {
  const [activeTab, setActiveTab] = useState<"read" | "write">("read");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full border-b border-border/30">
        {(["read", "write"] as const).map((tab) => (
          <p
            onClick={() => setActiveTab(tab)}
            key={tab}
            className="relative cursor-pointer px-4 py-3 hover:bg-secondary/90"
          >
            <span className="capitalize">{tab} Contract</span>
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 h-px w-full bg-black" />
            )}
          </p>
        ))}
      </div>

      {/* Render the ReadFunctions or WriteFunctions based on activeTab */}
      <div className="border border-b-0 border-border/30">
        {activeTab === "read" ? (
          <ReadFunctions functions={functions.read} />
        ) : (
          <WriteFunctions functions={functions.write} />
        )}
      </div>
    </div>
  );
}
