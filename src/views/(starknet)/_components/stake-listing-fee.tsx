import { Button } from "@/components/ui/button";
import { useStake } from "@/hooks/test/useStake";
import { useWalletStore } from "@/store/wallet.store";
import { useState } from "react";

export default function StakeListingFee() {
  const { stakeListingFee } = useStake();
  const [amount, setAmount] = useState("");

  const walletAddress = useWalletStore((state) => state.walletAddress);
  const isWalletConnected = useWalletStore((state) => state.isWalletConnected);

  const { transaction, receipt } = stakeListingFee(amount);

  const handleStakeAmount = () => {
    if (!amount || !isWalletConnected) {
      console.log("Wallet is not connected or amount is not set.");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="input-class" // Add appropriate styling class
      />
      <Button
        size={"lg"}
        disabled={!walletAddress || !isWalletConnected || !amount}
        isLoading={transaction.isPending}
        onClick={handleStakeAmount}
      >
        Stake Amount
      </Button>
    </div>
  );
}
