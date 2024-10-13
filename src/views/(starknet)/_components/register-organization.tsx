import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { REG_ORG_SCHEMA, regOrgSchema } from "@/lib/validators";
import { useContractStore } from "@/store/contract.store";
import { useOrganization } from "@/hooks/test/useOrganization";
import { toast } from "sonner";

export default function RegisterOrganization() {
  const validators = useContractStore((state) => state.validators);

  const { registerOrganization } = useOrganization();

  // 1. Define your form.
  const form = useForm<REG_ORG_SCHEMA>({
    resolver: zodResolver(regOrgSchema),
    defaultValues: {
      id: String(validators[0]) || "",
    },
  });

  let formData: REG_ORG_SCHEMA = {
    id: form.getValues("id"),
    name: form.getValues("name"),
    region: form.getValues("region"),
  };

  const { transaction, receipt } = registerOrganization(formData);

  // 2. Define a submit handler.
  async function onSubmit(values: REG_ORG_SCHEMA) {
    if (!values) return;

    try {
      await transaction.sendAsync();
      console.log({ transaction, receipt });
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "[SOMETHING_WENT_WRONG]",
      ),
        console.log("[SOMETHING_WENT_WRONG]", err);
    }
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Hooopes Foundation"
                  type="text"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="region"
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <FormControl>
                <Input
                  placeholder="Lagos State, Nigeria"
                  type="text"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id"
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Validator</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger disabled={isSubmitting}>
                    <SelectValue
                      placeholder="Select validator ID"
                      className="placeholder:text-muted-foreground"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {validators.map((validator) => (
                    <SelectItem
                      disabled={isSubmitting}
                      key={validator}
                      value={String(validator)}
                    >
                      Validator ID ({validator})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                If no validator, register a validator
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size={"lg"}
          disabled={isSubmitting || !isValid}
          isLoading={isSubmitting}
          txt="Registering..."
        >
          Register Organization
        </Button>
      </form>
    </Form>
  );
}
