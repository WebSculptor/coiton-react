import { contract } from "@/lib/contract";
import { useReadContract } from "@starknet-react/core";

export const useERCs = () => {
  const { contractAbi, contractAddress } = contract;

  const { data: ownerData } = useReadContract({
    address: contractAddress,
    functionName: "get_owner",
    abi: contractAbi,
    args: [],
    watch: true,
  });
  const { data: erc20Data } = useReadContract({
    address: contractAddress,
    functionName: "get_erc20",
    abi: contractAbi,
    args: [],
    watch: true,
  });
  const { data: erc721Data } = useReadContract({
    address: contractAddress,
    functionName: "get_erc721",
    abi: contractAbi,
    args: [],
    watch: true,
  });
  const { data: erc1155Data } = useReadContract({
    address: contractAddress,
    functionName: "get_erc1155",
    abi: contractAbi,
    args: [],
    watch: true,
  });

  return {
    ownerData: String(ownerData),
    erc20Data: String(erc20Data),
    erc721Data: String(erc721Data),
    erc1155Data: String(erc1155Data),
  };
};
