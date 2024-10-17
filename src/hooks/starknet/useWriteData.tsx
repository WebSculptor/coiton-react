import { shortStringToFelt } from "@/lib/utils";
import {
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";
import { useEffect, useMemo, useState } from "react";
import { useContractInstance } from "../test/useContractInstance";
import { Contract } from "starknet";

export const useWriteData = ({
  funcName,
  inputs,
}: {
  funcName: string;
  inputs: any[];
}) => {
  const { getContractInstance } = useContractInstance();
  const contractInstance: Contract = getContractInstance();

  const [queryData, setQueryData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  const registerValidatorCall = useMemo(() => {
    if (!inputs[0] || !contractInstance) return undefined;
    return [contractInstance.populate("register_validator", [inputs[0]])];
  }, [inputs[0], contractInstance]);

  const registerOrganizationCall = useMemo(() => {
    if (!inputs || !contractInstance) return undefined;

    let id = inputs[0],
      name = inputs[1],
      region = inputs[2];

    if (!name || !region || !id) return undefined;

    const nameFelt = shortStringToFelt(name)?.output?.toString(10);
    const regionFelt = shortStringToFelt(region)?.output?.toString(10);

    return [
      contractInstance.populate("register_organization", [
        id,
        nameFelt!,
        regionFelt!,
      ]),
    ];
  }, [inputs, contractInstance]);

  const transaction = useSendTransaction({
    calls:
      funcName === "register_validator"
        ? registerValidatorCall
        : funcName === "register_organization"
          ? registerOrganizationCall
          : undefined,
  });

  const receipt = useTransactionReceipt({
    hash: transaction.data?.transaction_hash,
    watch: true,
  });

  useEffect(() => {
    if (!transaction?.isSuccess && !receipt?.isSuccess) {
      setError(transaction?.error || null);
    } else {
      setError(null);
    }
    setQueryData(transaction?.data || null);
  }, [
    transaction?.isSuccess,
    receipt?.isSuccess,
    transaction?.error,
    transaction?.data,
  ]);

  return {
    result: { funcName, queryData, transaction, receipt },
    isLoading: transaction?.isPending,
    error,
  };
};
