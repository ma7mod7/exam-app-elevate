
'use client'
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { useForm, Controller } from "react-hook-form"
import { AddEmailFormValues, addEmailSchema } from "../../../shared/schema/add-email-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ChevronRight, Loader2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { ForgetPasswordSetEmail } from "@/app/api/register/register"

interface EmailStepProps {
    nextStep: () => void;
    setEmail: (email: string) => void
}

export default function ForgetPassword({ setEmail, nextStep }: EmailStepProps) {
    const {
        handleSubmit,
        control,
        reset,
    } = useForm<AddEmailFormValues>({
        resolver: zodResolver(addEmailSchema),
        defaultValues: {
            email: ''
        }
    })

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: ForgetPasswordSetEmail,
        onSuccess: (data, variables) => {
            void data
            setEmail(variables.email)
            nextStep()
            reset()
        },
        onError: (err) => {
            console.error("confirm email error", err.message);
        }
    });
    function onSubmit(data: AddEmailFormValues) {
        mutate(data)
    }
    return (
        <div className='flex w-1/2 justify-center items-center'>

            <div className='flex flex-col w-full h-full  justify-center  mb-28 '>
                <h1 className="mb-2 text-3xl font-bold">Forgot Password</h1>
                <p className="mb-8 text-gray-600">
                    Don&#39;t worry, we will help you recover your account.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="input-field-email" className={`mb-1 ${fieldState.invalid ? "text-red-500" : ""}`}>Email</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="input-field-email"
                                    type="text"
                                    placeholder="user@example.com"
                                    className={cn(
                                        "rounded-none w-full border-gray-200 py-6 outline-none transition-all",
                                        fieldState.invalid
                                            ? "border-red-500 focus-visible:ring-1 focus-visible:ring-red-500"
                                            : "focus-visible:ring-blue-500 focus-visible:ring-1 focus:border-blue-500"
                                    )}
                                />
                                {fieldState.invalid && <FieldError className="text-red-600" errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    {isError && (
                        <div className="relative mt-6">
                            <div className="text-red-600 text-sm text-center border p-3 border-red-600 bg-red-100">
                                {error?.message}
                            </div>
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="flex justify-center items-center gap-2 text-black h-12 bg-blue-100 border border-blue-400 rounded-none w-full mt-5 cursor-pointer hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Please wait...
                            </>
                        ) : (
                            <>
                                Next <ChevronRight size={20} />
                            </>
                        )}
                    </Button>
                    <Link href="register" className="flex items-center justify-center gap-1 text-gray-600 mt-8 text-sm  ">
                        Don&#39;t have an account? <p className="text-blue-600 hover:underline ml-0.5">Create Yours</p>
                    </Link>
                </form>

            </div>

        </div>
    )
}
