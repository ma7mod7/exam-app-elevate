import z from "zod";

const formDataSchema = z.object({
    firstName: z.string().min(2, { message: "Enter Your First Name" }),
    lastName: z.string().min(2, { message: "Enter Your Last Name" }),
    username: z.string().min(2, { message: "Enter Your User Name" }),
    phone: z
        .string()
        .min(11, { message: "Phone number must be at least 11 digits" })
        .max(15, { message: "Phone number is too long" })
});

export type formDataType = z.infer<typeof formDataSchema>;
export default formDataSchema;