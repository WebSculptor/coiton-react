import { contract } from "@/lib/contract";
import {
  useReadContract,
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";
import { useContractInstance } from "./useContractInstance";
import { useMemo } from "react";
import { ByteArray, Contract } from "starknet";

export const useListings = () => {
  const { contractAddress, contractAbi } = contract;
  const { getContractInstance } = useContractInstance();

  const contractInstance: Contract = getContractInstance();

  function fetchApprovedListings() {
    const transaction = useReadContract({
      address: contractAddress,
      functionName: "get_listings",
      abi: contractAbi,
      args: [],
      watch: true,
    });

    const refinedData = {
      approved:
        transaction?.data?.length > 0
          ? transaction?.data.map((lst: LISTING) => ({
              id: Number(lst.id),
              details: lst.details,
              hash: lst.hash,
              owner: String(lst.owner),
            }))
          : [],
    };

    return refinedData;
  }

  function fetchUnpprovedListings() {
    const transaction = useReadContract({
      address: contractAddress,
      functionName: "get_unapproved_listings",
      abi: contractAbi,
      args: [],
      watch: true,
    });

    const refinedData = {
      unapproved:
        transaction?.data?.length > 0
          ? transaction?.data.map((lst: LISTING) => ({
              id: Number(lst.id),
              details: lst.details,
              hash: lst.hash,
              owner: String(lst.owner),
            }))
          : [],
    };

    return refinedData;
  }

  function hashFn(value: string) {
    const calls = useMemo(() => {
      if (!value) {
        return undefined;
      }

      return [contractInstance.populate("hash", [value])];
    }, [value, contractInstance]);

    const hashTx = useSendTransaction({
      calls,
    });

    const hashReceipt = useTransactionReceipt({
      hash: hashTx?.data?.transaction_hash,
      watch: true,
    });

    return { hashTx, hashReceipt };
  }

  function createListings(details: ByteArray, detailHash: string) {
    const calls = useMemo(() => {
      if (!details || !detailHash) {
        return undefined;
      }

      return [
        contractInstance.populate("create_listing", [
          details,
          Number(detailHash),
        ]),
      ];
    }, [details, detailHash, contractInstance]);

    const transaction = useSendTransaction({
      calls,
    });

    const receipt = useTransactionReceipt({
      hash: transaction.data?.transaction_hash,
      watch: true,
    });

    return { transaction, receipt };
  }

  return {
    fetchApprovedListings,
    fetchUnpprovedListings,
    createListings,
    hashFn,
  };
};
