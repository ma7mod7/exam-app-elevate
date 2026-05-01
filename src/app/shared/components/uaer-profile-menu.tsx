'use client'
import { Bolt, EllipsisVertical, LogOut, Settings, User, UserRound } from "lucide-react"
import Image from "next/image"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"

export default function UserProfileMenu() {
    return (
        <div className="flex items-end flex-1 justify-center gap-2 mb-2 p-2">
            <Image src="/images/Avatar.png" alt="Avatar" width={54} height={54} />
            <div className="flex items-center gap-2 mt-4">
                <div>
                    <h3 className="text-blue-500 font-medium font-mono">Mahmoud Emad</h3>
                    <p className="text-sm text-gray-500">user@example.com</p>
                </div>

                {/* استخدام DropdownMenu الخاص بـ Shadcn */}
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <button className="mt-2 p-2 text-black rounded hover:bg-gray-200 cursor-pointer outline-none">
                            <EllipsisVertical width={20} height={20} />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-58 mb-6 rounded-none bg-white shadow-lg border-none  ">

                        <DropdownMenuItem className="cursor-pointer rounded-none hover:bg-gray-200">
                            <UserRound className="mr-2 h-4 w-4" />
                            <span>Account</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer rounded-none hover:bg-gray-200">
                            <Bolt className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="cursor-pointer rounded-none hover:bg-red-200">
                            <LogOut className="mr-2 h-4 w-4 text-red-600" />
                            <span className="text-red-600">Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}