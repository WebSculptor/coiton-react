import { cn } from "@/lib/utils";

export default function MaxWrapper({ children, className }: MAX_WRAPPER) {
  return (
    <section
      className={cn("mx-auto w-full max-w-[1404px] px-4 sm:px-5", className)}
    >
      {children}
    </section>
  );
}
