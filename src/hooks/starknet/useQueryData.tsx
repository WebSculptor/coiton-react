import { contract } from "@/lib/contract";
import { feltToShortString } from "@/lib/utils";
import { useReadContract } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useQueryData = ({
  funcName,
  inputs,
}: {
  funcName: string;
  inputs: any[];
}) => {
  const { contractAbi, contractAddress } = contract;

  const [queryData, setQueryData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const transaction = useReadContract({
    address: contractAddress,
    functionName: funcName,
    abi: contractAbi,
    args: inputs,
    watch: false,
  });

  useEffect(() => {
    if (transaction?.data && queryData !== transaction?.data) {
      let refinedData;

      switch (funcName) {
        case "version":
          refinedData = Number(transaction?.data);
          break;
        case "get_owner":
          refinedData = String(transaction?.data);
          break;
        case "hash":
          refinedData = String(transaction?.data);
          break;
        case "get_erc20":
          refinedData = String(transaction?.data);
          break;
        case "get_erc721":
          refinedData = String(transaction?.data);
          break;
        case "get_erc1155":
          refinedData = String(transaction?.data);
          break;
        case "get_unapproved_listings":
          refinedData =
            transaction?.data?.length > 0
              ? transaction?.data?.map((lst: LISTING) => ({
                  id: Number(lst.id),
                  details: lst.details,
                  hash: lst.hash,
                  owner: String(lst.owner),
                }))
              : [];
          break;
        case "get_listings":
          refinedData = transaction?.data
            ? transaction?.data?.map((lst: LISTING) => ({
                id: Number(lst.id),
                details: lst.details,
                hash: lst.hash,
                owner: String(lst.owner),
              }))
            : [];
          break;
        case "get_organizations":
          refinedData = transaction?.data
            ? transaction?.data?.map((org: ORGANIZATION) => ({
                id: Number(org.id),
                name: feltToShortString(org.name)?.output,
                region: feltToShortString(org.region)?.output,
                validator: Number(org.validator),
                domain: String(org.domain),
              }))
            : [];
          break;
        case "get_organization":
          refinedData = {
            id: Number(transaction?.data.id),
            name: feltToShortString(transaction?.data.name)?.output,
            region: feltToShortString(transaction?.data.region)?.output,
            validator: Number(transaction?.data.validator),
            domain: String(transaction?.data.domain),
          };
          break;

        default:
          setQueryData(null);
          setError("No handler for this function");
          return;
      }

      setQueryData(refinedData);
      setError(null);
    }

    if (transaction?.error) {
      setError(transaction.error.message);
      toast.error(transaction.error.message || "[SOMETHING WENT WRONG]");
      console.log("[SOMETHING WENT WRONG]", transaction.error);
    }
  }, [transaction?.data, transaction?.error]);

  return {
    result: { funcName, queryData },
    isLoading: transaction?.isLoading,
    error,
  };
};
