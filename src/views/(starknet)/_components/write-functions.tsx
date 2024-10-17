import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWriteData } from "@/hooks/starknet/useWriteData";
import { bigintReplacer, cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const WriteFunctions = ({ functions }: { functions: FunctionItem[] }) => {
  const [currentQuery, setCurrentQuery] = useState<{
    funcName: string;
    inputs: any[];
  } | null>(null);
  const [activeAccordion, setActiveAccordion] = useState("");
  const [inputValues, setInputValues] = useState<{ [key: string]: string[] }>(
    {},
  );
  const [queryResults, setQueryResults] = useState<{ [key: string]: any }>({});

  const { result, isLoading, error } = useWriteData(
    currentQuery || { funcName: "", inputs: [] },
  );

  const toggleAccordion = (fn: string) =>
    setActiveAccordion(activeAccordion === fn ? "" : fn);

  const handleTransact = async (fn: FunctionItem) => {
    const inputs = inputValues[fn.name] || [];
    setCurrentQuery({ funcName: fn.name, inputs });

    try {
      const sendResult = await result.transaction.sendAsync();
      setQueryResults((prev) => ({
        ...prev,
        [fn.name]: sendResult,
      }));
    } catch (error) {
      console.error("Error sending transaction:", error);
      setQueryResults((prev) => ({
        ...prev,
        [fn.name]: { error: "Transaction failed" },
      }));
    }
  };

  const handleInputChange = (fnName: string, index: number, value: string) => {
    setInputValues((prev) => {
      const updatedInputs = [...(prev[fnName] || [])];
      updatedInputs[index] = value;
      return { ...prev, [fnName]: updatedInputs };
    });
  };

  return functions.map((fn) => (
    <div key={fn.name} className="flex flex-col">
      <div
        onClick={() => toggleAccordion(fn.name)}
        className="flex h-[69px] cursor-pointer items-center justify-between border-y border-border/30 px-6 py-4 first:border-t-0 last:border-t-0 hover:bg-secondary/50"
      >
        <span className="flex items-center gap-2">
          <span className="tracking-wide text-[#bf43ca]">{fn.name}</span>
          <span className="space-x-2 tracking-wide">
            ({" "}
            {fn.inputs.length > 0 && (
              <i className="space-x-2 text-[#b91c1c]">
                {fn.inputs.map((input: { name: string }, index: number) => (
                  <span key={index}>
                    {input.name}
                    {index < fn.inputs.length - 1 && ", "}
                  </span>
                ))}
              </i>
            )}{" "}
            )
          </span>
        </span>

        <span
          className={cn("transition-transform duration-200", {
            "rotate-180": activeAccordion === fn.name,
          })}
        >
          <ChevronDown className="size-5" />
        </span>
      </div>

      {/* Accordion Content */}
      <div
        className={cn("h-0 overflow-hidden border-b border-border/30", {
          "h-max": activeAccordion === fn.name,
        })}
      >
        <div className="flex w-full flex-col gap-8 bg-background p-6">
          <div className="w-full max-w-[550px]">
            {fn.inputs.length > 0 ? (
              <>
                {fn.inputs.map(
                  (input: { name: string; type: string }, index: number) => (
                    <div key={index} className="mb-4 flex flex-col gap-3">
                      <Label className="flex flex-col">
                        <span className="text-lg">{input.name}</span>
                        <span className="text-sm leading-none text-muted-foreground">
                          {input.type}
                        </span>
                      </Label>
                      <Input
                        disabled={isLoading}
                        required
                        type="text"
                        className="rounded text-base tracking-wide"
                        value={inputValues[fn.name]?.[index] || ""}
                        onChange={(e) =>
                          handleInputChange(fn.name, index, e.target.value)
                        }
                        placeholder="(integer or hex, e.g.: 1 or 0x1)"
                      />
                    </div>
                  ),
                )}
                <Button
                  disabled={isLoading}
                  isLoading={isLoading}
                  txt="Transacting..."
                  onClick={() => handleTransact(fn)}
                  className="mt-4 w-max rounded px-7 py-3"
                >
                  Transact
                </Button>
              </>
            ) : (
              <Button
                disabled={isLoading}
                isLoading={isLoading}
                txt="Transacting..."
                onClick={() => handleTransact(fn)}
                className="mt-4 w-max rounded px-7 py-3"
              >
                Transact
              </Button>
            )}
          </div>

          <div className="min-w-[550px]">
            {activeAccordion === fn.name &&
              queryResults[fn.name] !== undefined && (
                <pre className="w-full rounded border border-blue-500 bg-blue-500/10 px-5 py-4 font-sans_italic text-blue-500">
                  {(() => {
                    const result = queryResults[fn.name];

                    if (
                      typeof result === "string" ||
                      typeof result === "number"
                    ) {
                      // Render string or number directly
                      return <span>{result}</span>;
                    }

                    if (Array.isArray(result)) {
                      // Render an empty array message or map over array items
                      return result.length === 0 ? (
                        <span>No results found.</span>
                      ) : (
                        result.map((item, index) => (
                          <div key={index} className="mb-4">
                            {typeof item === "object" ? (
                              // Map over object properties within the array
                              Object.entries(item).map(([key, value]) => (
                                <div key={key}>
                                  <strong>{key}:</strong>{" "}
                                  {JSON.stringify(value)}
                                </div>
                              ))
                            ) : (
                              <span>{JSON.stringify(item)}</span>
                            )}
                          </div>
                        ))
                      );
                    }

                    if (typeof result === "object" && result !== null) {
                      // Render single object properties
                      return Object.entries(result).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {JSON.stringify(value)}
                        </div>
                      ));
                    }

                    return null; // In case none of the conditions match
                  })()}
                </pre>
              )}
            {activeAccordion === fn.name && error && (
              <pre className="w-full rounded border border-red-500 bg-red-500/10 px-5 py-4 font-sans_italic text-red-500">
                {JSON.stringify(error, bigintReplacer, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  ));
};

export default React.memo(WriteFunctions);

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useFetchAllowance } from "@/hooks/starknet/useFetchAllowance";
// import { useWriteData } from "@/hooks/starknet/useWriteData";
// import { useContractInstance } from "@/hooks/test/useContractInstance";
// import { useOrganization } from "@/hooks/test/useOrganization";
// import { contract } from "@/lib/contract";
// import { bigintReplacer, cn, shortStringToFelt } from "@/lib/utils";
// import { useWalletStore } from "@/store/wallet.store";
// import {
//   useReadContract,
//   useSendTransaction,
//   useTransactionReceipt,
// } from "@starknet-react/core";
// import { ChevronDown, Info } from "lucide-react";
// import React, { useEffect, useMemo, useState } from "react";
// import { Contract, uint256 } from "starknet";

// function approveSpending(amount: number) {
//   const { contractAddress } = contract;
//   const { getErc20Instance } = useContractInstance();
//   const erc20Instance = getErc20Instance();

//   const calls = useMemo(() => {
//     if (!amount) return [];

//     return [
//       erc20Instance.populate("approve", [
//         contractAddress,
//         { low: amount, high: 0 },
//       ]),
//     ];
//   }, [amount]);

//   const transaction = useSendTransaction({
//     calls,
//   });

//   const receipt = useTransactionReceipt({
//     hash: transaction?.data?.transaction_hash,
//     watch: true,
//   });

//   return { transaction, receipt };
// }

// const WriteFunctions = ({ functions }: { functions: FunctionItem[] }) => {
//   const { getContractInstance } = useContractInstance();
//   const contractInstance: Contract = getContractInstance();

//   const { allowance: currentAllowance } = useFetchAllowance();

//   const isWalletConnected = useWalletStore((state) => state.isWalletConnected);

//   const [writeFunc, setWriteFunc] = useState<{
//     funcName: string;
//     inputs: any[];
//   } | null>(null);
//   const [activeAccordion, setActiveAccordion] = useState("");
//   const [inputValues, setInputValues] = useState<{ [key: string]: string[] }>(
//     {},
//   );
//   const [selectedInputs, setSelectedInputs] = useState<any[]>([]);
//   const [txResults, setTxResults] = useState<{ [key: string]: any }>({});

// const registerValidatorCall = useMemo(() => {
//   if (!selectedInputs[0] || !contractInstance) return undefined;
//   return [
//     contractInstance.populate("register_validator", [selectedInputs[0]]),
//   ];
// }, [selectedInputs[0], contractInstance]);

// const registerOrganizationCall = useMemo(() => {
//   if (!selectedInputs || !contractInstance) return undefined;

//   let id = selectedInputs[0],
//     name = selectedInputs[1],
//     region = selectedInputs[2];

//   if (!name || !region || !id) return undefined;

//   const nameFelt = shortStringToFelt(name)?.output?.toString(10);
//   const regionFelt = shortStringToFelt(region)?.output?.toString(10);

//   return [
//     contractInstance.populate("register_organization", [
//       id,
//       nameFelt!,
//       regionFelt!,
//     ]),
//   ];
// }, [selectedInputs, contractInstance]);

//   const stakeListingFeeCall = useMemo(() => {
//     if (!selectedInputs[0] || !contractInstance) return undefined;

//     let amount = Number(selectedInputs[0]);
//     const amountBigInt = BigInt(amount);

//     if (currentAllowance === null || currentAllowance < amountBigInt) {
//       console.log("[NO_ALLOWANCE]");
//       return;
//     }

//     if (currentAllowance < amountBigInt) {
//       const { transaction: approveTransaction } = approveSpending(amount);

//       if (approveTransaction?.status !== "success") {
//         return undefined;
//       }
//     }

//     return [contractInstance.populate("stake_listing_fee", [amount])];
//   }, [selectedInputs[0], contractInstance]);

// const transaction = useSendTransaction({
//   calls:
//     writeFunc?.funcName === "register_validator"
//       ? registerValidatorCall
//       : writeFunc?.funcName === "register_organization"
//         ? registerOrganizationCall
//         : writeFunc?.funcName === "stake_listing_fee"
//           ? stakeListingFeeCall
//           : undefined,
// });

// const receipt = useTransactionReceipt({
//   hash: transaction.data?.transaction_hash,
//   watch: true,
// });

//   const toggleAccordion = (fn: string) =>
//     setActiveAccordion(activeAccordion === fn ? "" : fn);

//   const handleTransact = async (fn: FunctionItem) => {
//     const inputs = inputValues[fn.name] || [];
//     setWriteFunc({ funcName: fn.name, inputs });
//     setSelectedInputs(inputs);

//     // Check if the transaction data is available and sendAsync is callable
// if (inputs.length > 0) {
//   try {
//     const sendResult = await transaction.sendAsync();
//     setTxResults((prev) => ({
//       ...prev,
//       [fn.name]: sendResult,
//     }));
//   } catch (error) {
//     console.error("Error sending transaction:", error);
//     setTxResults((prev) => ({
//       ...prev,
//       [fn.name]: { error: "Transaction failed" },
//     }));
//   }
// }
//   };

//   const handleInputChange = (fnName: string, index: number, value: string) => {
//     setInputValues((prev) => {
//       const updatedInputs = [...(prev[fnName] || [])];
//       updatedInputs[index] = value;
//       return { ...prev, [fnName]: updatedInputs };
//     });
//   };

//   useEffect(() => {
//     if (transaction?.data && receipt?.data && writeFunc) {
//       setTxResults((prev) => ({
//         ...prev,
//         [writeFunc.funcName]: transaction?.data,
//       }));
//       console.log({ result: transaction?.data, receipt: receipt?.data });
//     }
//   }, [transaction?.data, receipt?.data, writeFunc]);

//   return functions.map((fn) => (
//     <div key={fn.name} className="flex flex-col">
//       <div
//         onClick={() => toggleAccordion(fn.name)}
//         className="flex h-[69px] cursor-pointer items-center justify-between border-y border-border/30 px-6 py-4 first:border-t-0 last:border-t-0 hover:bg-secondary/50"
//       >
//         <span className="flex items-center gap-2">
//           <span className="tracking-wide text-[#bf43ca]">{fn.name}</span>
//           <span className="space-x-2 tracking-wide">
//             ({" "}
//             {fn.inputs?.length > 0 && (
//               <i className="space-x-2 text-[#b91c1c]">
//                 {fn.inputs.map((input, index) => (
//                   <span key={index}>
//                     {input.name}
//                     {index < fn.inputs?.length - 1 && ", "}
//                   </span>
//                 ))}
//               </i>
//             )}{" "}
//             )
//           </span>
//         </span>

//         <span
//           className={cn("transition-transform duration-200", {
//             "rotate-180": activeAccordion === fn.name,
//           })}
//         >
//           <ChevronDown className="size-5" />
//         </span>
//       </div>

//       {/* Accordion Content */}
//       <div
//         className={cn("h-0 overflow-hidden border-b border-border/30", {
//           "h-max": activeAccordion === fn.name,
//         })}
//       >
//         <div className="w-full space-y-8 bg-background p-6">
//           <div className="w-full max-w-[550px]">
//             {fn.inputs?.length > 0 && (
//               <>
//                 {fn.inputs.map((input, index) => (
//                   <div key={index} className="mb-4 flex flex-col gap-3">
//                     <Label className="flex flex-col">
//                       <span className="text-lg">{input.name}</span>
//                       <span className="text-sm leading-none text-muted-foreground">
//                         {input.type}
//                       </span>
//                     </Label>

//                     <Input
//                       disabled={transaction?.isPending}
//                       required
//                       type="text"
//                       className="rounded text-base tracking-wide"
//                       value={inputValues[fn.name]?.[index] || ""}
//                       onChange={(e) =>
//                         handleInputChange(fn.name, index, e.target.value)
//                       }
//                       placeholder="(integer or hex, e.g.: 1 or 0x1)"
//                     />
//                   </div>
//                 ))}
//                 <Button
//                   disabled={transaction?.isPending || !isWalletConnected}
//                   isLoading={transaction?.isPending}
//                   txt="Transacting..."
//                   onClick={() => handleTransact(fn)}
//                   className="mt-4 w-max rounded px-7 py-3"
//                 >
//                   Transact
//                 </Button>
//               </>
//             )}

//             {!isWalletConnected && (
//               <div className="mt-4 flex w-full items-center justify-between rounded border border-[#c28632] bg-[#fff5e6] p-4 text-[#c28632]">
//                 <p className="flex items-center font-sans_medium">
//                   <Info className="mr-2 size-5" />
//                   <span className="text-sm tracking-wide">
//                     Please connect your wallet to perform write functions
//                   </span>
//                 </p>
//               </div>
//             )}
//           </div>

//           {activeAccordion === fn.name && txResults[fn.name] && (
//             <div className="mt-4 min-w-[550px] space-y-1">
//               <p className="font-sans_medium">Query Result:</p>
//               <pre className="w-full rounded bg-secondary px-5 py-4 font-sans_italic">
//                 {JSON.stringify(txResults[fn.name], bigintReplacer, 2)}
//               </pre>
//             </div>
//           )}

//           {activeAccordion === fn.name && transaction?.isError && (
//             <div className="mt-4 text-red-500">
//               <p>Error: Something went wrong</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   ));
// };

// export default React.memo(WriteFunctions);
