import z from "zod";

export const SearchAndFilterSchema = z.object({
    searchTitle: z.string().optional(),
    Immutability: z.string().optional()
});

export type SearchAndFilterType = z.infer<typeof SearchAndFilterSchema>;

