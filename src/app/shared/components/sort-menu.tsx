// components/SortMenu.tsx
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowDownAZ, ArrowUpAz, CalendarArrowDown, CalendarArrowUp } from "lucide-react"
import { usePathname, useRouter } from "next/navigation";

interface SortMenuProps {
    children: React.ReactNode;
}

export function SortMenu({ children }: SortMenuProps) {
    const router = useRouter()
    const pathname = usePathname()

    const onSort = ({ sortBy, sortOrder }: { sortBy: string, sortOrder: string }) => {
        const params = new URLSearchParams(window.location.search);
        params.set('sortBy', sortBy);
        params.set('sortOrder', sortOrder);
        router.push(`${pathname}?${params.toString()}`);
    };
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="rounded-none font-mono min-w-55 bg-white text-black outline-none border-none p-2 *:mb-2 *:p-2 *:hover:bg-gray-300 ">
                <DropdownMenuItem onClick={()=>onSort({sortBy:"title",sortOrder:"desc"})} className="cursor-pointer ">
                    <ArrowDownAZ className="mr-2 h-4 w-4" />
                    <p>Title <span className="text-gray-400 ">(descending)</span></p>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>onSort({sortBy:"title",sortOrder:"asc"})} className="cursor-pointer ">
                    <ArrowUpAz className="mr-2 h-4 w-4" />
                    <p>Title <span className="text-gray-400 ">(ascending)</span></p>
                </DropdownMenuItem>
                <DropdownMenuItem  onClick={()=>onSort({sortBy:"createdAt",sortOrder:"desc"})} className="cursor-pointer ">
                    <CalendarArrowDown className="mr-2 h-4 w-4" />
                    <p>Newest <span className="text-gray-400 ">(descending)</span></p>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>onSort({sortBy:"createdAt",sortOrder:"asc"})}  className="cursor-pointer">
                    <CalendarArrowUp className="mr-2 h-4 w-4" />
                    <p>Newest <span className="text-gray-400 ">(ascending)</span></p>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}