"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ControllerFieldState, ControllerRenderProps,FieldValues } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { FieldError } from "@/components/ui/field"
import { Button } from "@/components/ui/button"

interface PasswordInputProps<T extends FieldValues> {
    field: ControllerRenderProps<T>; 
    fieldState: ControllerFieldState;
}

const PasswordInput = <T extends FieldValues>({ field, fieldState }:PasswordInputProps<T>) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="w-full space-y-2">
            <div className="relative">
                <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="password-toggle"
                    className={cn(
                        "rounded-none w-full border-gray-200 py-6 outline-none transition-all text-gray-600  ",
                        fieldState.invalid
                            ? "border-red-500 focus-visible:ring-1 focus-visible:ring-red-500"
                            : "focus-visible:ring-blue-500 focus-visible:ring-1 focus:border-blue-500"
                    )} 
                    placeholder="*******"
                    type={showPassword ? "text" : "password"}
                />
                {fieldState.invalid && <FieldError className="text-red-600" errors={[fieldState.error]} />}

                <Button
                    className="absolute top-0 right-0 h-full px-3 hover:bg-transparent text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                    size="icon"
                    type="button"
                    variant="ghost"
                >
                    {showPassword ? (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    ) : (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                </Button>
            </div>
        </div>
    )
}

export default PasswordInput
