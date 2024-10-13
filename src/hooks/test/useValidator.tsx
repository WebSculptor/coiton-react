import { useMemo } from "react";
import { useContractInstance } from "./useContractInstance";
import { Contract, TransactionReceipt } from "starknet";
import {
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";
import { useContractStore } from "@/store/contract.store";

export const useValidator = () => {
  const { getContractInstance } = useContractInstance();

  const setValidators = useContractStore((state) => state.setValidators);
  const setTransactionReceipt = useContractStore(
    (state) => state.setTransactionReceipt,
  );

  const contractInstance: Contract = getContractInstance();

  function registerValidator(validatorId: number) {
    // Only define `calls` if both validatorId and contractInstance are defined
    const calls = useMemo(() => {
      if (!validatorId || !contractInstance) {
        return undefined;
      }

      return [contractInstance.populate("register_validator", [validatorId])];
    }, [validatorId, contractInstance]);

    const transaction = useSendTransaction({
      calls,
    });

    const receipt = useTransactionReceipt({
      hash: transaction.data?.transaction_hash,
      watch: true,
    });

    if (receipt?.status === "success") {
      setValidators(validatorId);
      setTransactionReceipt(receipt?.data?.value as TransactionReceipt);
    }

    return { transaction, receipt };
  }

  return { registerValidator };
};
