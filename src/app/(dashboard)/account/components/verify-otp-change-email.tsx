import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import otpSchema, { OtpFormValues } from "../../../shared/schema/otp-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyEmail } from "@/app/api/account/user.api";


interface VerifyOtpStepProps {
    nextStep: () => void;
    prevStep: () => void;
    emailValue: string
    setIsOpen: (isOpen: boolean) => void

}
export default function VerifyOtpChangeEmail({ prevStep, emailValue, setIsOpen }: VerifyOtpStepProps) {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ["verify-email"],
        mutationFn: (code: string) => verifyEmail(code),
        onSuccess: () => {
            
            queryClient.invalidateQueries({ queryKey: ['user-profile'] });
            setIsOpen(false)
        }
    })
    const {
        handleSubmit,
        control,

    } = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            code: ''
        }
    })


    function onSubmit(data: OtpFormValues) {
        
        mutate(data.code)

    }
    return (
        <div className='relative h-100 w-137.5  items-center p-4 '>
            <div className='  flex flex-col   '>
                <h1 className="mb-1 text-3xl font-bold">Change Email</h1>
                <p className="text-blue-600 font-bold text-2xl mb-4 mt-4">
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
                    {/* {isError && (
                        <div className="relative mt-6">
                            <CircleX className="text-red-600 absolute -top-2 left-1/2 -translate-x-1/2" size={20} />
                            <div className="text-red-600 text-sm text-center border p-3 border-red-600 bg-red-100">
                                {error?.message}
                            </div>
                        </div>
                    )} */}
                    <p className="text-gray-400 mt-10 text-center text-sm text-medium">
                        You can request another code in: 60s
                    </p>


                    <Button
                        type="submit"
                        disabled={isPending}
                        className="flex gap-2 text-white h-12 bg-blue-600 border border-blue-400 rounded-none w-full mt-10 cursor-pointer hover:bg-blue-200"
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
                <button type="submit" onClick={() => { setIsOpen(false) }} className="absolute top-2 right-2 hover:bg-gray-300  cursor-pointer p-1">
                    <X width={16} height={16} />
                </button>
            </div>

        </div>
    )
}