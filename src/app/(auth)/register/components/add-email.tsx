
'use client'
import { useForm, Controller } from "react-hook-form"
import addEmailSchema, { AddEmailFormValues } from "../../../shared/schema/add-email-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ChevronRight, CircleX, Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { ConfirmEmail } from "@/app/api/register/register"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface EmailStepProps {
    nextStep: () => void;
    setEmail: (email: string) => void
}

export default function RegisterEmail({ nextStep, setEmail }: EmailStepProps) {

    const {
        handleSubmit,
        control,
        reset,
        setFocus
    } = useForm<AddEmailFormValues>({
        resolver: zodResolver(addEmailSchema),
        defaultValues: {
            email: ''
        }
    })

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: ConfirmEmail,
        onSuccess: (data,variables) => {
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
    useEffect(() => {
        setFocus("email")
    }, [setFocus])

    return (
        <div className='flex  w-1/2 justify-center items-center'>
            <div className=' flex flex-col w-full h-full justify-center   '>
                <h1 className="mb-8 text-3xl font-bold">Create Account</h1>

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
                            <CircleX className="text-red-600 absolute -top-2 left-1/2 -translate-x-1/2" size={20} />
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
                    <Link href="login" className="flex items-center justify-center gap-1 text-gray-600 mt-8 text-sm  ">
                        Already have an account ? <span className="text-blue-600 hover:underline ml-0.5">Login</span>
                    </Link>
                </form>

            </div>

        </div>
    )
}
