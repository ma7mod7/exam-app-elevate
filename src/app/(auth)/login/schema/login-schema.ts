import z from "zod";

const loginSchema = z.object({
    userName: z.string().nonempty("Your username is required"),
    password: z.string().nonempty("Your password is required")
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export default loginSchema;   