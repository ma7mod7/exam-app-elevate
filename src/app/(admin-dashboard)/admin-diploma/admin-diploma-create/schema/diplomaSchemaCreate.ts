// 1. Define the Schema
import * as z from "zod";

export const diplomaSchema = z.object({
    image: z.string().min(1, "An image is required"), // We validate the URL string
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
});

export type DiplomaValues = z.infer<typeof diplomaSchema>;
