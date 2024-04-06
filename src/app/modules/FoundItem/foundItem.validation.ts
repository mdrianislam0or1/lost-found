import { object, string } from "zod";

// FoundItem
export const foundItemCategorySchema = object({
  name: string(),
});
