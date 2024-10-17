import { contract } from "@/lib/contract";
import { useWalletStore } from "@/store/wallet.store";
import { useReadContract } from "@starknet-react/core";
import { uint256 } from "starknet";

export const useFetchAllowance = () => {
  const { erc20Abi, erc20Address, contractAddress } = contract;

  const walletAddress = useWalletStore((state) => state.walletAddress);

  // Call useReadContract at the top level
  const transaction = useReadContract({
    address: erc20Address,
    functionName: "allowance",
    abi: erc20Abi,
    args: [walletAddress, contractAddress],
    watch: true, // Set to true if you want to fetch the allowance on updates
  });

  // Compute allowance from the transaction data
  const allowance = transaction?.data
    ? uint256.uint256ToBN(transaction.data)
    : null;

  // Return the allowance value
  return { allowance };
};
