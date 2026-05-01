'use client' 
import { CircleUserRound, Lock, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation"; 
import Link from "next/link"; 

export default function AccountSideBar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col justify-between w-1/4 h-[78vh] bg-white p-4">
            <div>
                <ul>
                    <li className="mb-2">
                    
                        <Link 
                            href="/account" 
                            className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                                pathname === '/account' 
                                    ? 'bg-blue-100 text-blue-500 hover:bg-blue-200'
                                    : 'text-gray-500 hover:bg-gray-100'             
                            }`}
                        >
                            <CircleUserRound />
                            <span className="font-mono">Profile</span>
                        </Link>
                    </li>
                    
                    <li>
                        <Link 
                            href="/changepassword" 
                            className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                                pathname === '/changepassword' 
                                    ? 'bg-blue-100 text-blue-500 hover:bg-blue-200' 
                                    : 'text-gray-500 hover:bg-gray-100'
                            }`}
                        >
                            <Lock />
                            <span className="font-mono">Change Password</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div 
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="flex items-center gap-4 p-4 bg-red-100 text-red-500 hover:bg-red-200 cursor-pointer transition-colors"
            >
                <LogOut />
                <button className="font-medium outline-none">Logout</button>
            </div>
        </div>
    )
}