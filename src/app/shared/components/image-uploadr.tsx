"use client";

import React, { useCallback, useState } from "react";
import axios from "axios";
import { CloudUpload, FileImage, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
}

export function ImageUploader({ value, onChange }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleUpload = useCallback(async (file: File) => {
        setIsUploading(true);
        setProgress(0);

        const formData = new FormData();
        formData.append("file", file); // Adjust key if swagger expects a different field name

        try {
            const response = await axios.post("/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(percentCompleted);
                    }
                },
            });

            // Assuming the API returns { url: "/api/upload/temp/..." }
            if (response.data?.url) {
                onChange(response.data.url);
            }
        } catch (error) {
            console.error("Upload failed", error);
            // Handle error UI here
        } finally {
            setIsUploading(false);
        }
    }, [onChange]);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleUpload(file);
    };

    // If we already have an uploaded image URL, show a preview
    if (value) {
        return (
            <div className="relative border rounded-md p-4 flex items-center justify-center bg-gray-50">
                {/* Replace with next/image if you prefer */}
                <img src={value} alt="Uploaded" className="max-h-48 rounded-md object-contain" />
                <button
                    type="button"
                    onClick={() => onChange("")}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                >
                    <X className="w-4 h-4 text-gray-600" />
                </button>
            </div>
        );
    }

    return (
        <div className="border-2 border-dashed border-gray-200 rounded-md p-8 flex flex-col items-center justify-center bg-white relative">
            <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />

            {isUploading ? (
                <div className="w-full max-w-xs flex flex-col items-center gap-3">
                    <FileImage className="w-8 h-8 text-blue-500 animate-pulse" />
                    <Progress value={progress} className="h-2 w-full" />
                    <span className="text-sm text-gray-500">{progress}% Uploading...</span>
                </div>
            ) : (
                <div className="flex items-center gap-3 text-gray-500">
                    <CloudUpload className="w-6 h-6" />
                    <p className="text-sm">
                        Drop an image here or <span className="text-blue-500 font-medium">select from your computer</span>
                    </p>
                </div>
            )}
        </div>
    );
}