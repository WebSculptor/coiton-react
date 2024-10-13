import { Button } from "@/components/ui/button";
import { useContractInstance } from "@/hooks/test/useContractInstance";
import { generateRandomListings } from "@/lib/utils";
import {
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Contract } from "starknet";

export default function CreateListing() {
  const [listing, setListing] = useState<CREATE_LISTING | undefined>();
  const { getContractInstance } = useContractInstance();

  const contractInstance: Contract = getContractInstance();

  const detailHash = "{title: 'Hello world'}";
  // const detailHash =
  //   "529836718428447222478357386296020395959942825530363758275685";

  const hashCalls = useMemo(() => {
    if (!detailHash) {
      return undefined;
    }

    return [contractInstance.populate("hash", [detailHash])];
  }, [detailHash]);

  const hashTx = useSendTransaction({
    calls: hashCalls,
  });

  const hashReceipt = useTransactionReceipt({
    hash: hashTx.data?.transaction_hash,
    watch: true,
  });

  // const calls = useMemo(() => {
  //   if (!listing || !detailHash) {
  //     return undefined;
  //   }

  //   const details = stringToByteArray(JSON.stringify(listing));
  //   console.log("[STRING_TO_BYTE_ARRAY]", details);

  //   return [
  //     contractInstance.populate("create_listing", [details.data, detailHash]),
  //   ];
  // }, [listing, detailHash, contractInstance]);

  // const transaction = useSendTransaction({
  //   calls,
  // });

  // const receipt = useTransactionReceipt({
  //   hash: transaction.data?.transaction_hash,
  //   watch: true,
  // });

  const handleCreateListing = async () => {
    try {
      await hashTx.sendAsync();
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "[SOMETHING WENT WRONG]",
      );
      console.error("[SOMETHING WENT WRONG]", err);
    }
  };

  const handleGenerateListings = useCallback(() => {
    const ls = generateRandomListings();
    setListing(ls);
  }, []);

  useEffect(() => {
    handleGenerateListings();
  }, []);

  useEffect(() => {
    if (hashReceipt.data?.value) {
      console.log({
        hashTx: hashTx.data?.transaction_hash,
        hashReceipt: hashReceipt.data?.value,
      });
      toast.success("Listing created successfully!");
    }
  }, [hashReceipt.data?.value, hashTx.data?.transaction_hash]);

  return (
    <div className="flex flex-col gap-6 md:items-end">
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col items-start sm:flex-row sm:gap-2">
          <p className="w-40 font-sans_medium">Title:</p>
          <span className="flex-1 text-sm italic text-muted-foreground sm:text-base">
            {listing?.title}
          </span>
        </div>
        <div className="flex flex-col items-start sm:flex-row sm:gap-2">
          <p className="w-40 font-sans_medium">Price:</p>
          <span className="flex-1 text-sm italic text-muted-foreground sm:text-base">
            {listing?.price} WEI
          </span>
        </div>
        <div className="flex flex-col items-start sm:flex-row sm:gap-2">
          <p className="w-40 font-sans_medium">Description:</p>
          <span className="flex-1 text-sm italic text-muted-foreground sm:text-base">
            {listing?.description}
          </span>
        </div>
        <div className="flex flex-col items-start sm:flex-row sm:gap-2">
          <p className="w-40 font-sans_medium">Location:</p>
          <span className="flex-1 text-sm italic text-muted-foreground sm:text-base">
            {listing?.location}
          </span>
        </div>
        <div className="flex flex-col items-start sm:flex-row sm:gap-2">
          <p className="w-40 font-sans_medium">Amenities:</p>
          <span className="flex-1 text-sm italic text-muted-foreground sm:text-base">
            {listing?.amenities.join(", ") || "No amenities available"}
          </span>
        </div>
        <div className="flex flex-col items-start sm:flex-row sm:gap-2">
          <p className="w-40 font-sans_medium">Images:</p>
          <span className="flex flex-1 flex-wrap gap-4 overflow-x-scroll italic text-muted-foreground">
            {listing?.images
              ? listing.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Listing Image ${index + 1}`}
                    className="h-16 w-16 object-cover"
                  />
                ))
              : "No images available"}
          </span>
        </div>
        <div className="flex flex-col items-start sm:flex-row sm:gap-2">
          <p className="w-40 font-sans_medium">Owner:</p>
          <span className="flex-1 text-sm italic text-muted-foreground sm:text-base">
            {listing?.owner.name} - {listing?.owner.contact}
          </span>
        </div>
        <div className="flex flex-col items-start sm:flex-row sm:gap-2">
          <p className="w-40 font-sans_medium">Availability:</p>
          <span className="flex-1 text-sm italic text-muted-foreground sm:text-base">
            From: {listing?.availability.availableFrom} To:{" "}
            {listing?.availability.availableTo}
          </span>
        </div>
        <div className="flex flex-col items-start sm:flex-row sm:gap-2">
          <p className="w-40 font-sans_medium">Size:</p>
          <span className="flex-1 text-sm italic text-muted-foreground sm:text-base">
            {listing?.size.area} sqm, {listing?.size.bedrooms} Bedrooms,{" "}
            {listing?.size.bathrooms} Bathrooms
          </span>
        </div>
        <div className="flex flex-col items-start sm:flex-row sm:gap-2">
          <p className="w-40 font-sans_medium">Optional Features:</p>
          <span className="flex-1 text-sm italic text-muted-foreground sm:text-base">
            Furnished: {listing?.optionalFeatures.furnished ? "Yes" : "No"}, Pet
            Friendly: {listing?.optionalFeatures.petFriendly ? "Yes" : "No"},
            Smoking Allowed:{" "}
            {listing?.optionalFeatures.smokingAllowed ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex flex-col items-start sm:flex-row sm:gap-2">
          <p className="w-40 font-sans_medium">Ratings:</p>
          <span className="flex-1 text-sm italic text-muted-foreground sm:text-base">
            Average Rating: {listing?.ratings.averageRating} (
            {listing?.ratings.numberOfReviews} reviews)
          </span>
        </div>
        <div className="flex flex-col items-start sm:flex-row sm:gap-2">
          <p className="w-40 font-sans_medium">Listed At:</p>
          <span className="flex-1 text-sm italic text-muted-foreground sm:text-base">
            {listing?.createdAt}
          </span>
        </div>
        <div className="flex flex-col items-start sm:flex-row sm:gap-2">
          <p className="w-40 font-sans_medium">Updated At:</p>
          <span className="flex-1 text-sm italic text-muted-foreground sm:text-base">
            {listing?.updatedAt}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button size={"lg"} onClick={handleGenerateListings}>
          Generate Listing
        </Button>
        <Button
          //   disabled={!listing || receipt?.isLoading || transaction?.isPending}
          //   isLoading={receipt?.isLoading || transaction?.isPending}
          onClick={handleCreateListing}
          size={"lg"}
        >
          Create Listing
        </Button>
      </div>
    </div>
  );
}
