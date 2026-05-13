'use client'


import { useGetAdminDiplomaId } from "@/app/hooks/use-get-admindiplomas";
import Image from "next/image";



export default function DiplomaViewBody({ diplomaId }: { diplomaId: string }) {
    const { data, isLoading } = useGetAdminDiplomaId(diplomaId)
    console.log(data)
    if (isLoading) return <div>Loading diploma details...</div>;
    return (
        <div className="bg-white p-4 m-5 *:font-mono flex flex-col gap-8">
            <div className="space-y-3">
                <p className="text-gray-300  text-[14px]">Image</p>
                <Image src={data?.diploma.image || ''} alt="Logo" width={492} height={297} />
            </div>
            <div className="space-y-3">
                <p className="text-gray-300  text-[14px]">Title</p>
                <h2 className="font-bold text-[14px]">
                    {data?.diploma.title }
                </h2>
            </div>

            <div className="space-y-3">
                <p className="text-gray-300  text-[14px]">Description</p>
                <p className="  text-[14px] w-200" >
                    {data?.diploma.description }
                </p>
            </div>

        </div>
    )
}