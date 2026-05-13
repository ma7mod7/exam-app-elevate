"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"; // standard shadcn label
import { X, Save } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils"; // Make sure you have this utility from shadcn
import { diplomaSchema, DiplomaValues } from "./schema/diplomaSchemaCreate";
import { ImageUploader } from "@/app/shared/components/image-uploadr";






export default function AddDiplomaPage() {
    // 2. Initialize the form
    const { control, handleSubmit } = useForm<DiplomaValues>({
        resolver: zodResolver(diplomaSchema),
        defaultValues: {
            image: "",
            title: "",
            description: "",
        },
    });

    // 3. Handle final submission
    const onSubmit = async (data: DiplomaValues) => {
        console.log("Final payload to send to database:", data);
        
    };

    return (
        <div>
            <div className=" mx">

                {/* Header & Actions */}
                <div className="flex justify-between items-center m-6">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/diplomas" className="text-gray-400 hover:text-gray-600">
                                    Diplomas
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="text-gray-400" />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-blue-500 font-medium">
                                    Add New Diploma
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="bg-gray-100 text-gray-600 border-none hover:bg-gray-200">
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                        </Button>
                        {/* Note: We handle submission via the form onSubmit now, but this external button can still trigger it if needed, or you can use the form element directly */}
                        <Button onClick={handleSubmit(onSubmit)} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                            <Save className="w-4 h-4 mr-2" />
                            Save
                        </Button>
                    </div>
                </div>

                {/* Main Form Card */}
                <div className="bg-white border rounded-md shadow-sm overflow-hidden m-6">
                    <div className="bg-blue-600 text-white px-4 py-3 font-medium">
                        Diploma Information
                    </div>

                    <div className="p-6">
                        {/* Replaced <Form> with standard HTML <form> */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            {/* Image Field */}
                            <Controller
                                name="image"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <div className="flex flex-col space-y-1.5" data-invalid={fieldState.invalid}>
                                        <Label className={fieldState.invalid ? "text-red-500" : "text-gray-700 font-semibold"}>
                                            Image
                                        </Label>
                                        <ImageUploader
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                        {fieldState.invalid && (
                                            <span className="text-sm text-red-600 mt-1">{fieldState.error?.message}</span>
                                        )}
                                    </div>
                                )}
                            />

                            {/* Title Field */}
                            <Controller
                                name="title"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <div className="flex flex-col space-y-1.5" data-invalid={fieldState.invalid}>
                                        <Label htmlFor="title" className={fieldState.invalid ? "text-red-500" : "text-gray-700 font-semibold"}>
                                            Title
                                        </Label>
                                        <Input
                                            {...field}
                                            id="title"
                                            type="text"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter diploma title"
                                            className={cn(
                                                "transition-all",
                                                fieldState.invalid
                                                    ? "border-red-500 focus-visible:ring-1 focus-visible:ring-red-500"
                                                    : "focus-visible:ring-blue-500 focus-visible:ring-1 focus:border-blue-500"
                                            )}
                                        />
                                        {fieldState.invalid && (
                                            <span className="text-sm text-red-600 mt-1">{fieldState.error?.message}</span>
                                        )}
                                    </div>
                                )}
                            />

                            {/* Description Field */}
                            <Controller
                                name="description"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <div className="flex flex-col space-y-1.5" data-invalid={fieldState.invalid}>
                                        <Label htmlFor="description" className={fieldState.invalid ? "text-red-500" : "text-gray-700 font-semibold"}>
                                            Description
                                        </Label>
                                        <Textarea
                                            {...field}
                                            id="description"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter diploma description"
                                            className={cn(
                                                "min-h-[150px] resize-y transition-all",
                                                fieldState.invalid
                                                    ? "border-red-500 focus-visible:ring-1 focus-visible:ring-red-500"
                                                    : "focus-visible:ring-blue-500 focus-visible:ring-1 focus:border-blue-500"
                                            )}
                                        />
                                        {fieldState.invalid && (
                                            <span className="text-sm text-red-600 mt-1">{fieldState.error?.message}</span>
                                        )}
                                    </div>
                                )}
                            />

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
