import ConnectWallet from "@/layouts/(starknet)/_components/connect-wallet";
import MaxWrapper from "@/components/shared/max-wrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="left-0 top-0 z-50 w-full py-4 backdrop-blur-2xl md:sticky">
      <MaxWrapper className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="flex flex-col">
          <Button variant={"black"} className="h-12">
            Back to Home
          </Button>
        </Link>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <ConnectWallet />
        </div>
      </MaxWrapper>
    </header>
  );
}
