import z from "zod";

export const  ResetStrongPassword = z.object({
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
        .string()
        .min(1, { message: "Please confirm your password" }),
})
.refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], 
});

export type ResetStrongPasswordType = z.infer<typeof ResetStrongPassword>;



export const strongPassword = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
        .string()
        .min(1, { message: "Please confirm your password" }),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], 
});

export type strongPasswordType = z.infer<typeof strongPassword>;



export const changePassword = z.object({
    currentPassword: z.string().min(1, { message: "Current password is required" }),
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
        .string()
        .min(1, { message: "Please confirm your password" }),
})
.refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], 
});

export type changePasswordType = z.infer<typeof changePassword>;
