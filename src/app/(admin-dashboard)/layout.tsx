import { BookOpenCheck, FolderCode, GraduationCap, Logs, UserRound } from "lucide-react";
import Image from "next/image";
import UserProfileMenu from "../shared/components/uaer-profile-menu";
import Link from "next/link";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-dvh overflow-hidden required relative ">
            <aside className="flex flex-col w-64 bg-gray-800  p-4  z-10 relative">
                {/* logo and title */}
                <div className="mb-12 p-4">
                    <Image src="/images/logo.png" alt="Logo" width={192} height={37}  />
                    <div className="flex items-center gap-2 mt-3">
                        <FolderCode className='text-white' />
                        <h1 className="text-xl font-semibold font-mono text-white">Exam App</h1>
                    </div>
                </div>
                <nav className="px-1">
                    <ul className="text-white">
                        <li className="mb-6">
                            <div className="flex items-center hover:text-gray-50 hover:bg-gray-700   hover:border hover:border-gray-500 py-2 px-4">
                                <GraduationCap />
                                <Link href="/diplomas" className="mt-1  font-mono  px-2">Diplomas</Link>
                            </div>
                        </li>
                        <li className="mb-6">
                            <div className="flex items-center hover:text-gray-50 hover:bg-gray-700   hover:border hover:border-gray-500 py-2 px-4">
                                <BookOpenCheck />
                                <Link href="/diplomas" className="mt-1  font-mono  px-2">Exams</Link>
                            </div>
                        </li>

                        <li className="mb-6">
                            <div className="flex items-center hover:text-gray-50 hover:bg-gray-700   hover:border hover:border-gray-500 py-2 px-4 ">
                                <UserRound />
                                <Link href="/account" className="mt-1 font-mono   px-2">Account Settings </Link>
                            </div>
                        </li>
                        <li className="mb-6">
                            <div className="flex items-center hover:text-gray-50 hover:bg-gray-700   hover:border hover:border-gray-500 py-2 px-4 ">
                                <Logs />
                                <Link href="/account" className="mt-1 font-mono   px-2"> Audit Log </Link>
                            </div>
                        </li>
                    </ul>
                </nav>
                <UserProfileMenu />
            </aside>
            <main className="relative flex-1 bg-gray-200  overflow-y-auto">
                {children}
            </main>
        </div>
    );
}