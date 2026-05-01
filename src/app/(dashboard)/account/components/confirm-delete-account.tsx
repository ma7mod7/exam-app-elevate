'use client'

import { DeleteUserProfile } from "@/app/api/account/user.api";
import { useMutation } from "@tanstack/react-query";
import { TriangleAlert, X } from "lucide-react";



interface EmailStepProps {
    setIsOpenDeleteModule: (isOpen: boolean) => void
}


export default function ConfirmDeleteAccount({ setIsOpenDeleteModule }: EmailStepProps) {
    const { mutate } = useMutation({
        mutationKey: ["delete-user-profile"],
        mutationFn: DeleteUserProfile
    });
    const handleDeleteAccount = () => {
        mutate();
    }

    return (
        <>
            <div className=" p-4 h-70 w-137.5 mt-8">
                <div className="flex items-center justify-center w-full mb-4">
                    <div className="flex items-center justify-center w-20 h-20 bg-red-50 rounded-full">
                        <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full">
                            <TriangleAlert className="text-red-600 w-7 h-7" strokeWidth={2.5} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap4 items-center justify-center mt-2 ">
                    <h2 className="text-xl font-semibold font-mono text-red-500">
                        Are you sure you want to delete your account?
                    </h2>
                    <p className="text-sm font-mono text-gray-500">
                        This action is permanent and cannot be undone.
                    </p>
                </div>
                <div className="flex gap-2 items-center justify-center">
                    <button onClick={() => { setIsOpenDeleteModule(false) }} type="button" className="flex justify-center items-center gap-2 t h-12 bg-gray-300  text-black rounded-none w-full mt-16  cursor-pointer hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button onClick={handleDeleteAccount} type="submit" className="flex justify-center items-center gap-2 t h-12 text-red bg-red-500 text-white rounded-none w-full mt-16  cursor-pointer hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Yes, delete
                    </button>

                </div>
                <button onClick={() => { setIsOpenDeleteModule(false) }} className="absolute top-3 right-2 hover:bg-gray-300  cursor-pointer p-1">
                    <X width={16} height={16} />
                </button>
            </div>
        </>

    )

}