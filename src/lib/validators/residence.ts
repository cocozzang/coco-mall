import { z } from "zod"
export const ResidenceValidator = z.object({
  zipcode: z.string(),
  address: z.string(),
})

export type ResidencePayload = z.infer<typeof ResidenceValidator>
