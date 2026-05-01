import z from "zod";

export const addEmailSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
});

export type AddEmailFormValues = z.infer<typeof addEmailSchema>;




export const changeEmailSchema = z.object({
    newEmail: z.string().email({ message: "Please enter a valid email address" }),
});

export type ChangeEmailFormValues = z.infer<typeof changeEmailSchema>;
