import { useERCs } from "@/hooks/test/useERCs";
import { truncateAddr } from "@/lib/utils";
import { useState } from "react";

export default function ERCs() {
  const { ownerData, erc20Data, erc721Data, erc1155Data } = useERCs();
  const tx = { ownerData, erc20Data, erc721Data, erc1155Data };

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleMouseEnter = (key: string) => setHoveredItem(key);
  const handleMouseLeave = () => setHoveredItem(null);

  return (
    <div className="flex w-full flex-col gap-4">
      {[
        { label: "Owner Address", data: tx.ownerData, key: "owner" },
        { label: "Erc20 Contract", data: tx.erc20Data, key: "erc20" },
        { label: "Erc721 Contract", data: tx.erc721Data, key: "erc721" },
        { label: "Erc1155 Contract", data: tx.erc1155Data, key: "erc1155" },
      ].map(({ label, data, key }) => (
        <div
          key={key}
          className="flex flex-col items-start sm:flex-row sm:gap-2"
        >
          <p className="w-36 font-sans_medium">{label}:</p>
          <span
            className="w-max cursor-pointer text-sm italic text-muted-foreground sm:text-base"
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={handleMouseLeave}
          >
            {hoveredItem === key ? `0x${data}` : truncateAddr(`0x${data}`)}
          </span>
        </div>
      ))}
    </div>
  );
}
