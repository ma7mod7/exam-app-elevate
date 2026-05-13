

import DiplomaViewBody from "@/app/shared/components/diploma-view-body";
import HeaderAdminView from "@/app/shared/components/header-admin-view";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,

} from "@/components/ui/breadcrumb"


interface DiplomaViewProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<Record<string, string | undefined>>
}


export default async function AdminDiplomaView({ params, searchParams }: DiplomaViewProps) {
    const diplomaId = (await params).id
    const diplomaTitle = (await searchParams).diplomaTitle

    return (
        <>
            <div className='flex flex-col w-full  bg-white  '>
                <Breadcrumb className="p-4 px-6">
                    <BreadcrumbList>
                        <BreadcrumbItem className="text-gray-500 font-mono">
                            <BreadcrumbLink href="/admin-diploma">Diplomas</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem className="text-blue-500 font-mono">
                            <BreadcrumbLink href="/diplomas">{diplomaTitle}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <hr className="border-gray-300" />
                <div>
                    <HeaderAdminView diplomaId={diplomaId} />
                </div>
            </div>
            <DiplomaViewBody diplomaId={diplomaId}/>
        </>
    )

}

