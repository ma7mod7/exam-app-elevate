'use client'
import { useForm, Controller } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import PasswordInput from "@/app/shared/components/password-input"
import { Field } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import  { strongPassword, strongPasswordType } from "@/app/shared/schema/strong-password-schema"
import Link from "next/link"
import { Button } from "@/components/ui/button"


export default function CreateNewPassword() {
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
    function onSubmit(data: strongPasswordType) {
        void data
        reset()
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
                        name="password"
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

                    <Button type="submit" className="h-12 bg-blue-600 text-white rounded-none w-full mt-5 cursor-pointer hover:bg-blue-500" >
                        Reset Password
                    </Button>
                    <Link href="register" className="flex items-center justify-center  gap-1 text-gray-600 mt-8 text-sm  ">
                        Don&#39;t have an account?  <p className="text-blue-600 hover:underline ml-0.5">Create yours</p>
                    </Link>
                </form>

            </div>

        </div>
    )
}
