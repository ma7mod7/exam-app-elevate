import { useDeleteDiploma } from "@/app/hooks/use-get-admindiplomas";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, PenLine, Trash2 } from "lucide-react"
import Link from "next/link";


interface SortMenuProps {
    children: React.ReactNode;
    diplomaId:string,
    diplomaTitle:string
}

export function CrudDiploma({ children,diplomaId ,diplomaTitle}: SortMenuProps) {
    
    const {mutate}=useDeleteDiploma()

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="rounded-none font-mono min-w-45 bg-white text-black outline-none border-none p-2 *:mb-2 *:p-2 *:hover:bg-gray-300 ">

                <DropdownMenuItem className="cursor-pointer  ">
                    <Link href={`/admin-diploma/${diplomaId}?diplomaTitle=${diplomaTitle}`} className="flex gap-1">
                        <Eye className="mr-2 h-4 w-4 text-green-500" />
                        <span>View Details</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-blue-500 ">
                    <Link href={`/admin-diploma/admin-diploma-create?diplomaId=${diplomaId}`} className="flex gap-1">

                        <PenLine className="mr-2 h-4 w-4" />
                        <p>Edit</p>
                    </Link>

                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>mutate(diplomaId)}  className="cursor-pointer text-red-600 ">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <p>Delete</p>
                </DropdownMenuItem>


            </DropdownMenuContent>
        </DropdownMenu>
    );
}