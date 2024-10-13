import { useMemo } from "react";
import { useContractInstance } from "./useContractInstance";
import {
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";
// import { decimalToFelt } from "@/lib/utils"; // Make sure this utility works with StarkNet
import { Contract } from "starknet";

export const decimalToFelt = (num: string) => {
  return { output: BigInt(num).toString() };
};

export const useStake = () => {
  const { getContractInstance } = useContractInstance();
  const contractInstance: Contract = getContractInstance();

  const stakeListingFee = (amount: string) => {
    const calls = useMemo(() => {
      if (!amount || !contractInstance) return undefined;

      const feltAmount = decimalToFelt(amount).output;
      console.log({ feltAmount });

      return [contractInstance.populate("stake_listing_fee", [feltAmount])];
    }, [amount, contractInstance]);

    const { data, isPending, error } = useSendTransaction({ calls });

    const transaction = {
      data,
      isPending,
      error,
    };

    const receipt = useTransactionReceipt({
      hash: data?.transaction_hash,
      watch: true,
    });

    return { transaction, receipt };
  };

  return { stakeListingFee };
};
