
import HeaderAdmin from "@/app/shared/components/header-admin";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,


} from "@/components/ui/breadcrumb"



interface QuestionsProps {
    params: Promise<{ examList: string, examId: string }>;
    searchParams: Promise<Record<string, string | undefined>>
}

export default async function DiplomaListAdmin({ params, searchParams }: QuestionsProps) {


    return (
        <>
            <div className='flex flex-col w-full  bg-gray-100  '>
                <Breadcrumb className="p-4 px-6">
                    <BreadcrumbList>
                        <BreadcrumbItem className="text-gray-500 font-mono">
                            <BreadcrumbLink href="/diplomas">Diplomas</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <hr className="border-gray-300" />
                <div>
                    <HeaderAdmin actionTitle={'Add New Diploma'} />
                </div>
                
            </div>
        </>
    )

}
