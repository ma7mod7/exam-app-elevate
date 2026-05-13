'use client'

import { useDeleteDiploma } from "@/app/hooks/use-get-admindiplomas"
import { Button } from "@/components/ui/button"
import { Ban, PenLine, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation";


export default function HeaderAdminView({ diplomaId }: { diplomaId: string }) {
    const router = useRouter();
    const { mutate } = useDeleteDiploma()
    const handleDelete = () => {
        mutate(diplomaId, {
            onSuccess: () => {
                router.push('/admin-diploma')
            }
        })
    }
    const handleEdit = () => {
        router.push(`/admin-diploma/${diplomaId}/edit`)
    }
    return (
        <div className="flex justify-between items-center p-4 ">

            <h2 className="font-bold">
                AI & ML Development
            </h2>
            <div className="*:cursor-pointer *:text-white *:rounded-none *:p-5 *:font-mono space-x-2">
                <Button className="bg-gray-400 hover:bg-gray-500 " >
                    <Ban />
                    Immutable
                </Button>
                <Button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-600 " >
                    <PenLine className="w-4 h-4 mr-2" />
                    Edit
                </Button>
                <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 ">
                    <Trash2 />
                    Delete
                </Button>
            </div>
        </div>
    )
}