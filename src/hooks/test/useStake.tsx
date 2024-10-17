import { useMemo } from "react";
import { useContractInstance } from "./useContractInstance";
import {
  useReadContract,
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";
import { Contract, uint256 } from "starknet";
import { contract } from "@/lib/contract";
import { useWalletStore } from "@/store/wallet.store";

export const useStake = () => {
  const { erc20Abi, erc20Address, contractAddress } = contract;

  const { getContractInstance, getErc20Instance } = useContractInstance();
  const contractInstance: Contract = getContractInstance();
  const erc20Instance: Contract = getErc20Instance();

  const walletAddress = useWalletStore((state) => state.walletAddress);

  // Updated fetchAllowance
  function fetchAllowance() {
    // Hooks should be outside any condition
    const transaction = useReadContract({
      address: erc20Address,
      functionName: "allowance",
      abi: erc20Abi,
      args: [walletAddress, contractAddress],
      watch: true,
    });

    const allowance = transaction?.data
      ? uint256.uint256ToBN(transaction?.data)
      : null;

    return allowance;
  }

  // New approveSpending function
  function approveSpending(amount: number) {
    const transaction = useSendTransaction({
      calls: [
        erc20Instance.populate("approve", [
          contractAddress,
          uint256.bnToUint256(amount),
        ]),
      ],
    });

    const receipt = useTransactionReceipt({
      hash: transaction?.data?.transaction_hash,
      watch: true,
    });

    return { transaction, receipt };
  }

  function stakeListingFee(amount: number) {
    const currentAllowance = fetchAllowance();

    if (currentAllowance === null)
      return { error: "Failed to fetch allowance" };

    const amountBigInt = BigInt(amount);

    if (currentAllowance < amountBigInt) {
      const { transaction: approveTransaction } = approveSpending(amount);

      if (approveTransaction?.status !== "success") {
        return { error: "Waiting for approval transaction to confirm" };
      }
    }

    const calls = useMemo(() => {
      if (!amount || !contractInstance) return undefined;
      return [contractInstance.populate("stake_listing_fee", [amount])];
    }, [amount, contractInstance]);

    const transaction = useSendTransaction({ calls });

    const receipt = useTransactionReceipt({
      hash: transaction?.data?.transaction_hash,
      watch: true,
    });

    return { transaction, receipt };
  }

  return { stakeListingFee, fetchAllowance, approveSpending };
};
