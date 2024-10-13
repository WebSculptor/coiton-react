import { contract } from "@/lib/contract";
import { useContract } from "@starknet-react/core";
import { useCallback } from "react";

export const useContractInstance = () => {
  const { contractAddress, contractAbi } = contract;

  const getContractInstance = useCallback(() => {
    const { contract } = useContract({
      abi: contractAbi,
      address: contractAddress,
    });
    return contract;
  }, [contractAddress, contractAbi]);

  return { getContractInstance };
};
