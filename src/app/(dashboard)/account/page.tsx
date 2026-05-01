'use client'
import { UserRound, PenLine } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import HeaderTitle from "@/app/shared/components/header-title";
import { Input } from "@/components/ui/input";

import PhoneInput from 'react-phone-number-input'
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import userProfileSchema, { userProfileSchemaType } from "./schema/user-profile";
import { useState } from "react";
import ChangeEmailSteps from "./components/change-email-steps";
import ConfirmDeleteAccount from "./components/confirm-delete-account";
import AccountSideBar from "./components/account-side-bar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetUserProfile, UpdateUserProfile } from "@/app/api/account/user.api";
import 'react-phone-number-input/style.css'



export default function AccountSettings() {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenDeleteModule, setIsOpenDeleteModule] = useState(false)

    const { data: userData, isLoading } = useQuery({
        queryKey: ["user-profile"],
        queryFn: GetUserProfile
    })
    const user = userData?.user;

    const { mutate: updateUserProfile, isPending } = useMutation({
        mutationKey: ["user-profile"],
        mutationFn: UpdateUserProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-profile'] });
        }
    })
    let formattedPhone = user?.phone || '';
    if (formattedPhone.startsWith('0')) {
        formattedPhone = '+20' + formattedPhone.slice(1);
    }

    const {
        handleSubmit,
        control,
        

    } = useForm<userProfileSchemaType>({
        resolver: zodResolver(userProfileSchema),
        values: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            username: user?.username || '',
            email: user?.email || '',
            phone: formattedPhone
        }
    })

    function onSubmit(data: userProfileSchemaType) {
        const { username, email, ...dataToSend } = data;
        if (dataToSend.phone && dataToSend.phone.startsWith('+20')) {
            dataToSend.phone = '0' + dataToSend.phone.slice(3);
        }
        updateUserProfile(dataToSend, {
            onSuccess: (data) => {
               void data
            }
        })

    }
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading ...</div>
    }


    return (
        <>
            <div className="bg-gray-100 relative  ">
                <div className='flex w-full items-center bg-gray-200 p-4 '>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="text-gray-500 font-mono">
                                <BreadcrumbLink >Account</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <HeaderTitle title={`Account Settings`} icon={<UserRound width={45} height={45} />} link="/diplomas" />

                <div className="flex p-4  px-12">
                    <AccountSideBar />
                    <div className="p-4 px-10 flex  justify-center w-3/4  ml-6 bg-white">

                        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                            <div className="flex gap-3 ">

                                <Controller
                                    name="firstName"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="input-field-email" className={`mb-1 font-medium font-mono  ${fieldState.invalid ? "text-red-500" : ""}`}>First name

                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                aria-invalid={fieldState.invalid}
                                                id="input-field-email"
                                                type="text"
                                                required
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
                                <Controller
                                    name="lastName"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="input-field-email" className={`mb-1 font-medium font-mono ${fieldState.invalid ? "text-red-500" : ""}`}>Last name

                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                aria-invalid={fieldState.invalid}
                                                id="input-field-email"
                                                type="text"
                                                required
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
                            </div>
                            <Controller
                                name="username"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="mt-3">
                                        <FieldLabel htmlFor="input-field-email" className={`mb-1 font-medium font-mono ${fieldState.invalid ? "text-red-500" : ""}`}>Username

                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            id="input-field-email"
                                            type="text"
                                            required
                                            disabled

                                            className={cn(
                                                "rounded-none w-full border-gray-200 py-6 outline-none transition-all bg-gray-200",
                                                fieldState.invalid
                                                    ? "border-red-500 focus-visible:ring-1 focus-visible:ring-red-500"
                                                    : "focus-visible:ring-blue-500 focus-visible:ring-1 focus:border-blue-500"
                                            )}
                                        />
                                        {fieldState.invalid && <FieldError className="text-red-600" errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <div>

                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid} className="mt-3 ">
                                            <FieldLabel htmlFor="input-field-email" className={`flex justify-between mb-1 font-medium font-mono ${fieldState.invalid ? "text-red-500" : ""}`}>

                                                <p>email</p>
                                                <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:text-blue-700 hover:underline  ">
                                                    <PenLine width={16} height={16} />
                                                    <button type="button" onClick={() => { setIsOpen(!isOpen) }} className="text-sm ">change email</button>
                                                </div>
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                aria-invalid={fieldState.invalid}
                                                id="input-field-email"
                                                type="text"
                                                required

                                                className={cn(
                                                    "rounded-none w-full border-gray-200 py-6 outline-none transition-all",
                                                    fieldState.invalid
                                                        ? "border-red-500 focus-visible:ring-1 focus-visible:ring-red-500 "
                                                        : "focus-visible:ring-blue-500 focus-visible:ring-1 focus:border-blue-500"
                                                )}
                                            />
                                            {fieldState.invalid && <FieldError className="text-red-600" errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />

                            </div>

                            <Controller
                                name="phone"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="mt-3">
                                        <FieldLabel className={`mb-1 font-medium font-mono ${fieldState.invalid ? "text-red-500" : ""}`}>
                                            Phone
                                        </FieldLabel>

                                        <PhoneInput
                                            {...field}
                                            defaultCountry="EG"
                                            international={false}
                                            limitMaxLength={true}
                                            // الكلاسات دي عشان تظبط شكل المكون بالكامل مع shadcn
                                            className={cn(
                                                "outline-none flex h-12 w-full border border-gray-200 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-0 focus-within:ring-blue-500 focus-within:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
                                                fieldState.invalid && "border-red-500 focus-within:ring-red-500"
                                            )}
                                        />
                                    </Field>
                                )}
                            />
                            <div className="flex gap-2 justify-center align-center mt-5  ">

                                <Button onClick={() => { setIsOpenDeleteModule(!isOpenDeleteModule) }} type="button" className="flex font-medium gap-2 text-red-500 w-1/2 h-12 bg-red-100 border  rounded-none cursor-pointer hover:bg-red-400" >
                                    Delete My Account
                                </Button>
                                {isPending ? (
                                    <Button disabled className="flex font-medium gap-2 text-white w-1/2 h-12 bg-blue-600 border  rounded-none cursor-pointer" >
                                        Updating...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="flex font-medium gap-2 text-white w-1/2 h-12 bg-blue-600 border  rounded-none cursor-pointer hover:bg-blue-500" >
                                        Update My Profile
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {isOpen && <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-100 flex items-center justify-center">
                    <div className="bg-white p-4 ">
                        <ChangeEmailSteps setIsOpen={setIsOpen} />
                    </div>
                </div>}

                {isOpenDeleteModule && <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-100 flex items-center justify-center">
                    <div className="bg-white p-4  relative">
                        <ConfirmDeleteAccount
                            setIsOpenDeleteModule={setIsOpenDeleteModule}
                        />
                    </div>
                </div>}

            </div>

        </>
    )

}
