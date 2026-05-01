'use client'
import { useForm, Controller } from "react-hook-form"
import loginSchema, { LoginFormValues } from "./schema/login-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { CircleX } from "lucide-react"
import PasswordInput from "@/app/shared/components/password-input"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


export default function LoginPage() {
    const [error, setError] = useState<string | null>("")
    const router=useRouter()
    const {
        handleSubmit,
        control,
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            userName: "",
            password: ""
        }
    })
    async function onSubmit(data: LoginFormValues) {
        console.log(data)
        //use it in client side only
        const res = await signIn("credentials", {
            username: data.userName,
            password: data.password,
            redirect: false,
            
        })
        if (!res?.ok) {
            setError(res?.error || 'An error occurred');
            return;
        }
        const callbackUrl = new URLSearchParams(location.search).get('callbackUrl') || '/';

        // eslint-disable-next-line react-hooks/immutability
        router.replace(callbackUrl);


    }
    return (
        <div className='flex w-1/2 justify-center items-center'>
            <div className='flex flex-col w-full h-full justify-center'>
                <h1 className="mb-8 text-3xl font-bold">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="userName"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="input-field-username" className={`mb-1 ${fieldState.invalid ? "text-red-500" : ""}`}>Username</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="input-field-username"
                                    type="text"
                                    placeholder="user123"
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
                        name="password"
                        control={control}
                        render={({ field, fieldState }) => (

                            <Field>
                                <Label htmlFor="password-toggle" className={`mt-4 ${fieldState.invalid ? "text-red-500" : ""}`}>Password</Label>
                                <PasswordInput
                                    field={field}
                                    fieldState={fieldState} />
                            </Field>
                        )}

                    />

                    <Link href="/forget-password" className="flex items-center justify-end gap-1 mt-2 text-sm text-blue-600 hover:underline ml-0.5  ">
                        Forgot your password?
                    </Link>

                    {error ? (
                        <>
                            <div className="relative  mt-9">
                                <CircleX className="text-red-600 absolute -top-2 left-1/2" size={20} />
                                <div className="text-red-600 text-sm text-center border p-3 border-red-600 bg-red-100">
                                    {error}
                                </div>
                            </div>
                        </>
                    ) : null}

                    <Button type="submit" className="h-12 bg-blue-600 text-white rounded-none w-full mt-5 cursor-pointer hover:bg-blue-500" >
                        Login
                    </Button>
                    <Link href="register" className="flex items-center justify-center gap-1 text-gray-600 mt-8 text-sm  ">
                        Don&#39;t have an account? <p className="text-blue-600 hover:underline ml-0.5">Create Yours</p>
                    </Link>
                </form>

            </div>

        </div>
    )
}
