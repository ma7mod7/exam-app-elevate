import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import Link from 'next/link'

export default function HeaderAdmin({ actionTitle }: { actionTitle: string}) {
    return (
        <div className="flex justify-between p-2 px-6 mt-6">
            <div className="flex items-center justify-center gap-6 font-mono ">
                <div>
                    <span>1 - 20</span>  of  <span> 548 </span>
                </div>
                <div className="flex items-center justify-center gap-4 border border-gray-300 ">
                    <button className="p-3 bg-gray-200 cursor-pointer hover:bg-gray-300"><ChevronLeft className="w-4 h-4 text-gray-400" /></button>
                    <span className="px-2 "> page 1 of 28</span>
                    <button className="p-3 bg-gray-200 cursor-pointer hover:bg-gray-300 "><ChevronRight className="w-4 h-4 text-gray-500" /></button>
                </div>
            </div>
            <div className="bg-green-600 flex items-center justify-center gap-2 text-white px-4 py-2  cursor-pointer hover:bg-green-500 font-mono">
                <Plus />
                <p>
                    {actionTitle}
                </p>

            </div>
        </div>
    )
}