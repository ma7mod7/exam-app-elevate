
import { CircleQuestionMark } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,

} from "@/components/ui/breadcrumb"
import ExamResultsUI from "./components/results-page";
import HeaderTitle from "@/app/shared/components/header-title";

interface QuestionsProps {
    params: Promise<{ examList: string, examId: string }>;
    searchParams: Promise<Record<string, string | undefined>>
}

export default async function ExamResult({  searchParams }: QuestionsProps) {
    
    const diplomaId = (await searchParams).diplomaId||'';
    const examTitle = (await searchParams).examTitle || "Exam Title";
    const diplomaTitle = (await searchParams).diplomaTitle || "Diploma Title";
    const submissionId=(await searchParams).submissionId||'';

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
                                <BreadcrumbLink href={`/diplomas/${diplomaId}`}>{diplomaTitle}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="mx-2 text-gray-400" />

                            <BreadcrumbItem className="text-blue-500 font-mono">
                                <BreadcrumbLink>{examTitle}</BreadcrumbLink>
                            </BreadcrumbItem>

                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <HeaderTitle title={`${examTitle} `} icon={<CircleQuestionMark width={45} height={45} />} link={`/diplomas/${diplomaId}`} />
                <div>
                    <ExamResultsUI examTitle={examTitle} submissionId={submissionId} />
                </div>
            </div>
        </>
    )

}
