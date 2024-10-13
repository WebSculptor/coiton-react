/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { type LottieComponentProps } from "lottie-react";
import { Suspense, lazy } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const LazyLottieComponent = lazy(() => import("lottie-react"));

interface LottieProps<T extends Record<string, unknown>> {
  getAnimationData: () => Promise<T>;
  id: string;
}

export default function LazyLottie<T extends Record<string, unknown>>({
  getAnimationData,
  id,
  ref,
  ...props
}: LottieProps<T> & Omit<LottieComponentProps, "animationData">) {
  const { data } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      void import("lottie-react");
      return getAnimationData();
    },
    enabled: typeof window !== "undefined",
  });

  if (!data)
    return (
      <Skeleton className={cn(`h-[${props.height}px] w-[${props.width}px]`)} />
    );

  // Clone the data object to avoid modifying a non-extensible object
  const mutableData = { ...data };

  return (
    <Suspense
      fallback={
        <Skeleton
          className={cn(`h-[${props.height}px] w-[${props.width}px]`)}
        />
      }
    >
      <LazyLottieComponent animationData={mutableData} {...props} />
    </Suspense>
  );
}
