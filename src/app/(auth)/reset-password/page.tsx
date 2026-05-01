'use client'
import { useForm, Controller } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import PasswordInput from "@/app/shared/components/password-input"
import { Field } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { ResetStrongPassword, ResetStrongPasswordType } from "@/app/shared/schema/strong-password-schema"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { setNewPassword } from "@/app/api/register/register"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function CreateNewPassword() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');
    const {
        handleSubmit,
        control,

    } = useForm<ResetStrongPasswordType>({
        resolver: zodResolver(ResetStrongPassword),
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        }
    })
    const { mutate, isPending } = useMutation({
        mutationFn: setNewPassword,
        onSuccess: () => {
            toast('Password Changed successfully,Now Login Please😊')
            setTimeout(() => {

                router.push('/login');
            }, 2000);
        }
    });
    function onSubmit(data: ResetStrongPasswordType) {
        mutate({ ...data, token: token! })
    }
    return (
        <div className='flex w-1/2 justify-center items-center'>

            <div className='flex flex-col w-full h-full justify-center  mb-28 '>
                <h1 className="mb-2 text-3xl font-bold ">Create a New Password</h1>
                <p className=" text-md text-gray-400 font-mono">
                    Create a new strong password for your account.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="newPassword"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <Label htmlFor="password-toggle" className={`mt-4 ${fieldState.invalid ? "text-red-500" : ""}`}>New Password
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
                                <Label htmlFor="password-toggle" className={`mt-4 ${fieldState.invalid ? "text-red-500" : ""}`}>Confirm New Password
                                    <span className="text-destructive text-red-600">*</span>
                                </Label>
                                <PasswordInput
                                    field={field}
                                    fieldState={fieldState} />
                            </Field>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="h-12 bg-blue-600 text-white rounded-none w-full mt-5 cursor-pointer hover:bg-blue-500"                    >
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Please wait...
                            </>
                        ) : (
                            <>
                                Reset Password
                            </>
                        )}
                    </Button>

                    <Link href="register" className="flex items-center justify-center  gap-1 text-gray-600 mt-8 text-sm  ">
                        Don&#39;t have an account?  <p className="text-blue-600 hover:underline ml-0.5">Create yours</p>
                    </Link>
                </form>

            </div>

        </div>
    )
}
