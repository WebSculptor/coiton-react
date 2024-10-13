import MaxWrapper from "@/components/shared/max-wrapper";
import NotFound from "@/components/shared/not-found";

export default function ListingsView() {
  return (
    <section className="overflow-x-clip">
      <MaxWrapper className="flex justify-center">
        <NotFound />
      </MaxWrapper>
    </section>
  );
}
