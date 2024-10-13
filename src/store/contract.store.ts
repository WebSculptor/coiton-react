import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TransactionReceipt } from "starknet";

interface CONTRACT_STATE extends CONTRACT_STORE, CONTRACT_STORE_ACTIONS {}

declare interface CONTRACT_STORE {
  validators: number[];
  transactionReceipts: TransactionReceipt[];
}

declare interface CONTRACT_STORE_ACTIONS {
  setValidators: (validator: number) => void;
  setTransactionReceipt: (receipt: TransactionReceipt) => void;
}

export const useContractStore = create<CONTRACT_STATE>()(
  persist(
    (set, get) => ({
      validators: [],
      transactionReceipts: [],

      setValidators: (validator) => {
        const { validators } = get();
        if (!validators.includes(validator)) {
          set({ validators: [...validators, validator] });
        }
      },
      setTransactionReceipt: (receipt) => {
        const { transactionReceipts } = get();
        if (
          !transactionReceipts.some(
            (r) => r.transaction_hash === receipt.transaction_hash,
          )
        ) {
          set({ transactionReceipts: [...transactionReceipts, receipt] });
        }
      },
    }),
    { name: "contract_storage" },
  ),
);
