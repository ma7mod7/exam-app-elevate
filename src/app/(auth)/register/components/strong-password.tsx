'use client'
import { useForm, Controller } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"

import PasswordInput from "@/app/shared/components/password-input"
import { Field } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import  { strongPassword, strongPasswordType } from "@/app/shared/schema/strong-password-schema"
import { FullUserData, RegisterFormData } from "@/lib/types/register"
import { useMutation } from "@tanstack/react-query"
import { RegisterUser } from "@/app/api/register/register"
import { useRouter } from 'next/navigation'
import {  Loader2 } from "lucide-react"
import { toast } from "sonner"

interface IProps {
    userData: RegisterFormData | null
}

export default function StrongPassword({ userData }: IProps) {
    const router = useRouter();
    const {
        handleSubmit,
        control,
        reset,

    } = useForm<strongPasswordType>({
        resolver: zodResolver(strongPassword),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: RegisterUser,
        onSuccess: (data) => {
            void data
            toast.success("Account Created successfully,Now Login Please😊");
            setTimeout(() => {
                router.replace('/login');
            }, 2000);
        },
        onError: (err) => {
            console.error("confirm email error", err.message);
        }
    });

    function onSubmit(data: strongPasswordType) {
        const finalPayload = {
            ...userData,
            password: data.password,
            confirmPassword: data.confirmPassword,
        } as FullUserData
        
        mutate(finalPayload)
        reset()
    }
    return (
        <div className='flex w-1/2 justify-center items-center'>

            <div className='flex flex-col w-full h-full justify-center  mb-28 '>
                <h1 className="mb-8 text-3xl font-bold">Create Account</h1>
                <p className="font-bold text-2xl text-blue-600">
                    Create a strong password
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <Controller
                        name="password"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <Label htmlFor="password-toggle" className={`mt-4 ${fieldState.invalid ? "text-red-500" : ""}`}>Password
                                    <span className="text-destructive text-red-600">*</span>
                                </Label>
                                <PasswordInput
                                    field={field}
                                    fieldState={fieldState} />
                            </Field>
                        )}
                    />

                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <Label htmlFor="password-toggle" className={`mt-4 ${fieldState.invalid ? "text-red-500" : ""}`}>Confirm Password
                                    <span className="text-destructive text-red-600">*</span>
                                </Label>
                                <PasswordInput
                                    field={field}
                                    fieldState={fieldState} />
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
                        className="h-12 bg-blue-600 text-white rounded-none w-full mt-5 cursor-pointer hover:bg-blue-500"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Please wait...
                            </>
                        ) : (
                            <>
                                Create Account
                            </>
                        )}
                    </Button>


                </form>

            </div>

        </div>
    )
}
