
'use client'
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import formDataSchema, { formDataType } from "../schema/form-data-schema"
import PhoneInput from 'react-phone-number-input'
import { RegisterFormData } from "@/lib/types/register"
import 'react-phone-number-input/style.css'

interface formDataStepProps {
    nextStep: () => void;
    emailValue:string,
    setUserData:(data:RegisterFormData)=>void
}

export default function FormRegister({ nextStep,emailValue,setUserData }: formDataStepProps) {
    const {
        handleSubmit,
        control,
        reset,

    } = useForm<formDataType>({
        resolver: zodResolver(formDataSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            username: ''
        }
    })
    
    function onSubmit(data: formDataType) {
        const userData={...data,email:emailValue}
        setUserData(userData)
        nextStep()
        reset()
    }


    return (
        <div className='flex  w-1/2 justify-center items-center '>
            <div className=' flex flex-col w-full h-full justify-center   '>
                <h1 className="mb-3 text-3xl font-bold">Create Account</h1>
                <p className="text-blue-600 font-bold text-2xl mb-8">
                    Tell us more about you
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-3">

                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="input-field-email" className={`mb-1 font-medium font-mono  ${fieldState.invalid ? "text-red-500" : ""}`}>First name
                                        <span className="text-destructive text-red-600">*</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        id="input-field-email"
                                        type="text"
                                        required
                                        placeholder="Mahmoud"
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
                                        <span className="text-destructive text-red-600">*</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        id="input-field-email"
                                        type="text"
                                        required
                                        placeholder="Emad"
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
                                    <span className="text-destructive text-red-600">*</span>
                                </FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="input-field-email"
                                    type="text"
                                    required
                                    placeholder="ma7mod"
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
                        name="phone"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="mt-3">
                                <FieldLabel className={`mb-1 font-medium font-mono ${fieldState.invalid ? "text-red-500" : ""}`}>
                                    Phone <span className="text-red-600">*</span>
                                </FieldLabel>

                                <PhoneInput
                                    {...field}
                                    defaultCountry="EG"
                                    placeholder="Enter phone number"
                                    // الكلاسات دي عشان تظبط شكل المكون بالكامل مع shadcn
                                    className={cn(
                                        "flex h-12 w-full border border-gray-200 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
                                        fieldState.invalid && "border-red-500 focus-within:ring-red-500"
                                    )}
                                />
                            </Field>
                        )}
                    />
                    <Button type="submit" className="flex gap-2 text-black h-12 bg-blue-100 border border-blue-400 rounded-none w-full mt-5 cursor-pointer hover:bg-blue-200" >
                        Next <ChevronRight />
                    </Button>
                </form>

            </div>

        </div>
    )
}

