import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WALLET_STATE extends WALLET_STORE, WALLET_STORE_ACTIONS {}

export const useWalletStore = create<WALLET_STATE>()(
  persist(
    (set) => ({
      walletAddress: undefined,
      isWalletConnected: false,
      currentConnector: undefined,

      setWalletAddress: (address) => set({ walletAddress: address }),
      setIsWalletConnected: (isConnected) =>
        set({ isWalletConnected: isConnected }),
      setCurrentConnector: (connector) => set({ currentConnector: connector }),
    }),
    { name: "wallet_storage" }
  )
);
