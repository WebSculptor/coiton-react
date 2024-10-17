import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryData } from "@/hooks/starknet/useQueryData";
import { bigintReplacer, cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";

const ReadFunctions = ({ functions }: { functions: FunctionItem[] }) => {
  const [currentQuery, setCurrentQuery] = useState<{
    funcName: string;
    inputs: any[];
  } | null>(null);
  const [activeAccordion, setActiveAccordion] = useState("");
  const [inputValues, setInputValues] = useState<{ [key: string]: string[] }>(
    {},
  );
  const [queryResults, setQueryResults] = useState<{ [key: string]: any }>({});

  const { result, isLoading, error } = useQueryData(
    currentQuery || { funcName: "", inputs: [] },
  );

  const toggleAccordion = (fn: string) =>
    setActiveAccordion(activeAccordion === fn ? "" : fn);

  const handleQuery = (fn: FunctionItem) => {
    const inputs = inputValues[fn.name] || [];
    setCurrentQuery({ funcName: fn.name, inputs });
  };

  const handleInputChange = (fnName: string, index: number, value: string) => {
    setInputValues((prev) => {
      const updatedInputs = [...(prev[fnName] || [])];
      updatedInputs[index] = value;
      return { ...prev, [fnName]: updatedInputs };
    });
  };

  useEffect(() => {
    if (result?.queryData && currentQuery) {
      setQueryResults((prev) => ({
        ...prev,
        [currentQuery.funcName]: result?.queryData,
      }));
    }
  }, [result?.queryData, currentQuery]);

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
                  txt="Querying..."
                  onClick={() => handleQuery(fn)}
                  className="mt-4 w-max rounded px-7 py-3"
                >
                  Query
                </Button>
              </>
            ) : (
              <Button
                disabled={isLoading}
                isLoading={isLoading}
                txt="Querying..."
                onClick={() => handleQuery(fn)}
                className="mt-4 w-max rounded px-7 py-3"
              >
                Query
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

export default React.memo(ReadFunctions);
