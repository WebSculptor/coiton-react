import { contract } from "@/lib/contract";
import { feltToShortString, shortStringToFelt } from "@/lib/utils";
import { REG_ORG_SCHEMA } from "@/lib/validators";
import {
  useReadContract,
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";
import { useContractInstance } from "./useContractInstance";
import { Contract } from "starknet";
import { useMemo } from "react";

export const useOrganization = () => {
  const { contractAddress, contractAbi } = contract;
  const { getContractInstance } = useContractInstance();

  const contractInstance: Contract = getContractInstance();

  function fetchOrganizations() {
    const transaction = useReadContract({
      address: contractAddress,
      functionName: "get_organizations",
      abi: contractAbi,
      args: [],
      watch: true,
    });

    const refinedData =
      transaction?.data?.length > 0
        ? transaction?.data.map((org: ORGANIZATION) => ({
            id: Number(org.id),
            name: feltToShortString(org.name)?.output,
            region: feltToShortString(org.region)?.output,
            validator: Number(org.validator),
            domain: `0x${String(org.domain)}`,
          }))
        : [];

    return refinedData;
  }

  function registerOrganization(formData: REG_ORG_SCHEMA) {
    const { name, region, id } = formData;
    const calls = useMemo(() => {
      if (!name || !region || !id) {
        return undefined;
      }

      const nameFelt = shortStringToFelt(name)?.output?.toString(10);
      const regionFelt = shortStringToFelt(region)?.output?.toString(10);

      return [
        contractInstance.populate("register_organization", [
          id,
          nameFelt!,
          regionFelt!,
        ]),
      ];
    }, [id, name, region, contractInstance]);

    const transaction = useSendTransaction({
      calls,
    });

    const receipt = useTransactionReceipt({
      hash: transaction.data?.transaction_hash,
      watch: true,
    });

    return { transaction, receipt };
  }

  return { fetchOrganizations, registerOrganization };
};
