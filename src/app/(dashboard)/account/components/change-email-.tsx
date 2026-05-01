'use client'
import { ChangeEmailFormValues, changeEmailSchema } from "@/app/shared/schema/add-email-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { ChevronRight, CircleX, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button";
import { ChangeEmailRequest } from "@/app/api/account/user.api";
import { useMutation } from "@tanstack/react-query";


interface EmailStepProps {
    nextStep: () => void;
    setEmail: (email: string) => void
    setIsOpen: (isOpen: boolean) => void

}


export default function ChangeEmail({ nextStep, setEmail, setIsOpen }: EmailStepProps) {

    const { mutate: changeEmail, isPending } = useMutation({
        mutationKey: ["change-email"],
        mutationFn: (newEmail: ChangeEmailFormValues) => ChangeEmailRequest(newEmail),
        onSuccess: (data,variables) => {
            console.log(data)
            setEmail(variables.newEmail)
            nextStep()
        },

    })
    const { handleSubmit, control } = useForm<ChangeEmailFormValues>({
        resolver: zodResolver(changeEmailSchema),
        defaultValues: {
            newEmail: ""
        }
    })
    function onSubmit(data: ChangeEmailFormValues) {
        changeEmail(data)

    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="relative p-4 h-80 w-137.5">
                <div className="relative ">
                    <div>
                        <h1 className="font-bold text-2xl ">Change Email</h1>
                        <p className="font-bold text-3xl text-blue-500 mt-4 ">Enter new email </p>
                        <Controller
                            name="newEmail"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="input-field-email" className={`mt-4 ${fieldState.invalid ? "text-red-500" : ""}`}>Email</FieldLabel>
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
                        {false && (
                            <div className="relative mt-6">
                                <CircleX className="text-red-600 absolute -top-2 left-1/2 -translate-x-1/2" size={20} />
                                <div className="text-red-600 text-sm text-center border p-3 border-red-600 bg-red-100">
                                    error message
                                </div>
                            </div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="flex justify-center items-center gap-2 t h-12 bg-blue-500 text-white rounded-none w-full mt-16  cursor-pointer hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                </div>
                <button type="button" onClick={() => { setIsOpen(false) }} className="absolute top-2 right-2 hover:bg-gray-300  cursor-pointer p-1">
                    <X width={16} height={16} />
                </button>
            </form>
        </>

    )

}