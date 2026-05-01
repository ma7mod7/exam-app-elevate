import { BookOpenCheck } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,

} from "@/components/ui/breadcrumb"
import HeaderTitle from "@/app/shared/components/header-title";
import ExamListCard from "./components/exam-list";

interface ExamProps {
    searchParams: Promise<Record<string, string | undefined>>
}

export default async function Exam({ searchParams }: ExamProps) {
    const diplomaTitle = (await searchParams).title || "Diploma Title";

    return (
        <>
            <div>
                <div className='flex w-full items-center bg-gray-200 p-4 '>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="text-gray-500 font-mono">
                                <BreadcrumbLink href="/diplomas">Diplomas</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="mx-2 text-gray-400" />
                            <BreadcrumbItem className="text-gray-500 font-mono">
                                <BreadcrumbLink href="/diplomas">{diplomaTitle}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="mx-2 text-gray-400" />

                            <BreadcrumbItem className="text-blue-500 font-mono">
                                <BreadcrumbLink>Exams</BreadcrumbLink>
                            </BreadcrumbItem>

                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <HeaderTitle title={`${diplomaTitle} Exams`} icon={<BookOpenCheck width={45} height={45} />} link={`/diplomas`} />

                <div>
                    <ExamListCard diplomaTitle={diplomaTitle} />
                </div>

            </div>
        </>
    )

}
