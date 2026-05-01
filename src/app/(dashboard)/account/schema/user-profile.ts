import z from "zod";

const userProfileSchema = z.object({
    firstName: z.string().min(2, { message: "Enter Your First Name" }),
    lastName: z.string().min(2, { message: "Enter Your Last Name" }),
    username: z.string().min(2, { message: "Enter Your User Name" }),
    email: z.string().email({ message: "Enter a valid email address" }),
    phone: z
        .string()
        .min(11, { message: "Phone number must be  11 digits" })
});

export type userProfileSchemaType = z.infer<typeof userProfileSchema>;
export default userProfileSchema;