import * as z from "zod"

const  otpSchema = z.object({
    code: z
    .string()
    .length(6, { message: "Your one-time password must be 6 characters." })
    .regex(/^\d+$/, { message: "OTP must contain only numbers." }),
})
export default  otpSchema
export type OtpFormValues = z.infer<typeof otpSchema>