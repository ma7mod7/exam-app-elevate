
'use client'
import { Field } from "@/components/ui/field"
import { useForm, Controller } from "react-hook-form"
import otpSchema, { OtpFormValues } from "../../../shared/schema/otp-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useMutation } from "@tanstack/react-query"
import { ConfirmOtp } from "@/app/api/register/register"
import { CircleX, Loader2 } from "lucide-react"

interface VerifyOtpStepProps {
    nextStep: () => void;
    prevStep: () => void;
    emailValue: string

}


export default function VerifyOtp({ nextStep, prevStep, emailValue }: VerifyOtpStepProps) {

    const {
        handleSubmit,
        control,
        reset,
    } = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            code: ''
        }
    })

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: ConfirmOtp,
        onSuccess: () => {
            nextStep()
            reset()
        },
        onError: (err) => {
            console.error("confirm email error", err.message);
        }
    });

    function onSubmit(data: OtpFormValues) {
        mutate({ ...data, email: emailValue })
    }
    return (
        <div className='flex w-1/2 justify-center items-center'>
            <div className='relative w-full h-full flex flex-col   '>
                <h1 className="mb-1 text-3xl font-bold">Create Account</h1>
                <p className="text-blue-600 font-bold text-2xl mb-4">
                    Verify OTP
                </p>

                <p className="text-gray-400 [word-spacing:4px] ">
                    Please enter the 6-digits code we have sent to: <br />
                    <span className="text-black "> {emailValue}.</span>
                    <Button type="button" onClick={prevStep} className=" text-blue-600 hover:underline ">
                        Edit
                    </Button>
                </p>

                <form onSubmit={handleSubmit(onSubmit)} >

                    <Controller
                        name="code"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="flex justify-center mt-5 ml-24">
                                <InputOTP maxLength={6} {...field}  >
                                    <InputOTPGroup className="gap-4">
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </Field>
                        )}
                    />
                    {isError && (
                        <div className="relative mt-6">
                            <CircleX className="text-red-600 absolute -top-2 left-1/2 -translate-x-1/2" size={20} />
                            <div className="text-red-600 text-sm text-center border p-3 border-red-600 bg-red-100">
                                {error?.message}
                            </div>
                        </div>
                    )}
                    <p className="text-gray-400 mt-10 text-center text-sm text-medium">
                        You can request another code in: 60s
                    </p>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="flex gap-2 text-black h-12 bg-blue-100 border border-blue-400 rounded-none w-full mt-10 cursor-pointer hover:bg-blue-200"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Please wait...
                            </>
                        ) : (
                            <>
                                Verify Code

                            </>
                        )}
                    </Button>

                </form>

            </div>

        </div>
    )
}
