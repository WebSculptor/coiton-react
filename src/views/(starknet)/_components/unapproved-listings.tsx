import { useListings } from "@/hooks/test/useListing";

export default function UnapprovedListings() {
  const { fetchUnpprovedListings } = useListings();

  const tx = fetchUnpprovedListings();

  return (
    <div className="rounded-sm border border-blue-500 bg-blue-500/10 p-4">
      <pre className="font-sans_regular whitespace-pre-wrap text-sm sm:text-base">
        {JSON.stringify(tx, null, 2)}
      </pre>
    </div>
  );
}
