import { Button } from "@/components/ui/button";
import { useValidator } from "@/hooks/test/useValidator";
import { generateValidatorId } from "@/lib/utils";
import { RotateCw } from "lucide-react";
import { useState } from "react";

export default function RegisterValidator() {
  const { registerValidator } = useValidator();

  const [vId, setVId] = useState(0);

  function handleGenerateId() {
    let vId = generateValidatorId(8);
    setVId(vId);
  }

  const { transaction, receipt } = registerValidator(vId);

  async function handleRegisterValidator() {
    if (!vId) return null;
    await transaction.sendAsync();

    console.log({
      transaction: transaction?.data?.transaction_hash,
      receipt: receipt?.data?.value,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-max rounded-sm border border-blue-500 bg-blue-500/10 p-4">
        <RotateCw
          className="absolute right-3 top-3 size-5 cursor-pointer"
          onClick={handleGenerateId}
        />
        <pre className="font-sans_regular whitespace-pre-wrap text-sm sm:text-base">
          {JSON.stringify({ validatorId: vId }, null, 2)}
        </pre>
      </div>
      <Button
        size={"lg"}
        disabled={!vId || transaction.isPending || receipt?.isLoading}
        isLoading={transaction.isPending || receipt?.isLoading}
        txt="Registering..."
        onClick={handleRegisterValidator}
      >
        Register Validator
      </Button>
    </div>
  );
}
