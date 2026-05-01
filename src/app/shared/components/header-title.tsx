import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function HeaderTitle({ title, icon,link }: { title: string; icon: React.ReactNode; link: string }) {
    return (
        <div className="flex items-center  px-8 ">
            <Link href={link} className="block border ml-4 border-blue-300  p-2 py-6 cursor-pointer hover:bg-gray-200">
                <ChevronLeft className="text-blue-600" />
            </Link>
            <div className="flex items-center gap-2 p-4 bg-blue-500 text-white m-4 flex-1">
                {icon}
                <h1 className="text-2xl font-semibold ">{title} </h1>
            </div>
        </div>
    )
}