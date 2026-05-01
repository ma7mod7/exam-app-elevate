'use client'
import { UserRound, PenLine, Loader2 } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label"

import { Field } from "@/components/ui/field"
import HeaderTitle from "@/app/shared/components/header-title";

import { Button } from "@/components/ui/button";

import { changePassword, changePasswordType } from "@/app/shared/schema/strong-password-schema";
import AccountSideBar from "../account/components/account-side-bar";
import PasswordInput from "@/app/shared/components/password-input";
import { useMutation } from "@tanstack/react-query";
import { ChangeUserPassword } from "@/app/api/account/user.api";



export default function ChangePassword() {
    const {mutate, isPending}=useMutation({
        mutationKey:['change-password'],
        mutationFn:(data:changePasswordType)=> ChangeUserPassword(data),
        onSuccess:(data)=>{
            console.log(data)
            reset();
            
        }
    })
    const {
        handleSubmit,
        control,
        reset
    } = useForm<changePasswordType>({
        resolver: zodResolver(changePassword),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }

    })

    function onSubmit(data: changePasswordType) {
        mutate(data)
        
    }


    return (
        <>
            <div className="bg-gray-100 relative         ">
                <div className='flex w-full items-center bg-gray-200 p-4 '>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="text-gray-500 font-mono">
                                <BreadcrumbLink >Account</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="font-mono">
                                <BreadcrumbLink className="text-blue-500">Change Password</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <HeaderTitle title={`Account Settings`} icon={<UserRound width={45} height={45} />} link="/diplomas"/>

                <div className="flex p-4  px-12">
                    <AccountSideBar />
                    <div className="p-4 px-10 flex  justify-center w-3/4  ml-6 bg-white">

                        <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
                            <Controller
                                name="currentPassword"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field className="mb-10">
                                        <Label htmlFor="password-toggle" className={`mt-4 font-mono ${fieldState.invalid ? "text-red-500" : ""}`}>Current Password
                                            <span className="text-destructive text-red-600">*</span>
                                        </Label>
                                        <PasswordInput
                                            field={field}
                                            fieldState={fieldState} />
                                    </Field>
                                )}
                            />
                            <hr className="text-gray-300" />
                            <Controller
                                name="newPassword"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field className="mt-4">
                                        <Label htmlFor="password-toggle" className={`mt-4 font-mono ${fieldState.invalid ? "text-red-500" : ""}`}>New Password
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
                                        <Label htmlFor="password-toggle" className={`mt-4 font-mono ${fieldState.invalid ? "text-red-500" : ""}`}>Confirm New Password
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
                                className="h-12 font-mono bg-blue-600 text-white rounded-none w-full mt-5 cursor-pointer hover:bg-blue-500"                    >
                                {isPending ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Please wait...
                                    </>
                                ) : (
                                    <>
                                        Update Password
                                    </>
                                )}
                            </Button>

                        </form>
                    </div>
                </div>


            </div>

        </>
    )

}
