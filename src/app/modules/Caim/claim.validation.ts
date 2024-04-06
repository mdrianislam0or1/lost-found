import { z } from "zod";

export const createClaimSchema = z.object({
  foundItemId: z.string().uuid(),
  distinguishingFeatures: z.string().nonempty(),
});
