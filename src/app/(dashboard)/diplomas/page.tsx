import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,

} from "@/components/ui/breadcrumb"
import { GraduationCap } from "lucide-react"

import DiplomaList from "./components/diploma-list"

export default function Diplomas() {
    return (
        <div>
            <div className='flex w-full items-center bg-gray-200 p-4 '>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="text-blue-500 font-mono">
                            <BreadcrumbLink>Diplomas</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="p-6">
                <div className="flex items-center gap-2 p-4 bg-blue-500 text-white" >
                    <GraduationCap width={45} height={45} />
                    <h1 className="text-2xl font-semibold ">Diplomas </h1>
                </div>
                <div >
                    <DiplomaList />
                </div>
            </div>
        </div>
    )
}

