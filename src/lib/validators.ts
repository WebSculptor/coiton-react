import { z } from "zod";

export const regOrgSchema = z.object({
  name: z
    .string({ required_error: "Organization Name is required." })
    .min(2, {
      message: "Name must contain at least 2 character(s)",
    })
    .max(30, { message: "Name must contain at most 31 character(s)" }),
  region: z
    .string({ required_error: "Organization Region is required." })
    .min(2, {
      message: "Region must contain at least 2 character(s)",
    })
    .max(30, { message: "Region must contain at most 31 character(s)" }),
  id: z.string({ required_error: "Validator id is required." }),
});

export type REG_ORG_SCHEMA = z.infer<typeof regOrgSchema>;
