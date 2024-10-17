import { contract } from "@/lib/contract";
import { useContract } from "@starknet-react/core";
import { useCallback } from "react";

export const useContractInstance = () => {
  const { contractAddress, contractAbi, erc20Abi, erc20Address } = contract;

  const getContractInstance = useCallback(() => {
    const { contract } = useContract({
      abi: contractAbi,
      address: contractAddress,
    });
    return contract;
  }, [contractAddress, contractAbi]);

  const getErc20Instance = useCallback(() => {
    const { contract } = useContract({
      abi: erc20Abi,
      address: erc20Address,
    });
    return contract;
  }, [erc20Abi, erc20Address]);

  return { getContractInstance, getErc20Instance };
};
