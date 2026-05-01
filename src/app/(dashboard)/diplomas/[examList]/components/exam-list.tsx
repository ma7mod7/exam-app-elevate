'use client'
import ExamCard from "@/app/(dashboard)/exam/components/exam-card";
import { DIPLOMA_KEYS } from "@/lib/constants/api.constant";
import { IApiResponse, IPaginatedResponse } from "@/lib/types/api";
import { IExam } from "@/lib/types/exam";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useParams } from "next/navigation";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";



export default function ExamListCard({diplomaTitle}: {diplomaTitle: string}) {
    const searchParams = useSearchParams();
    const params = useParams();
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;
    const diplomaId = params.examList;

    const { data: examDiplomaPages, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: DIPLOMA_KEYS.list(page, limit),
        queryFn: async ({ pageParam }) => {
            const res = await fetch(`/api/examList?page=${pageParam}&limit=${limit}&diplomaId=${diplomaId} `);
            const data: IApiResponse<IPaginatedResponse<IExam>> = await res.json();
            if (data.status === false) {
                throw new Error(data.message);
            }
            return data.payload;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.metadata.page === lastPage.metadata.totalPages) return undefined;
            return lastPage.metadata.page + 1;
        }

    });

    const allExamDiplomaPages = useMemo(() => examDiplomaPages?.pages.flatMap(page => page.data) || [], [examDiplomaPages])

    if (isLoading) {
        return <h4>Loading...</h4>
    }

    if (!diplomaId) {
        console.error("Diploma ID is missing in search parameters.");
        return <h4>Error: Diploma ID is missing in search parameters.</h4>
    }
    return (


        <InfiniteScroll
            dataLength={allExamDiplomaPages.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>End of list</b>
                </p>
            }
        >
            {allExamDiplomaPages.map((exam) => (
                <div key={exam.id} className="relative group m-8 p-3 flex items-center gap-6 bg-blue-100">
                    <div className="bg-blue-100 p-4 relative border border-blue-300/75">
                        <Image src={exam.image || ''} alt="Diploma" width={150} height={150} />
                    </div>
                    <ExamCard
                        title={exam.title}
                        description={exam.description}
                        duration={exam.duration}
                        questionsCount={exam.questionsCount}
                    />
                    <div className="absolute bottom-8 right-4 opacity-0 translate-y-6 group-hover:opacity-100  transition-all duration-300 ease-in-out">
                        <Link
                            href={`/exam/${exam.id}?examTitle=${encodeURIComponent(exam.title)}&diplomaTitle=${encodeURIComponent(diplomaTitle)}&diplomaId=${diplomaId}`}
                            className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6  shadow-md"
                        >

                            <div className="flex items-center gap-2">
                                <p>Start</p>
                                <MoveRight />
                            </div>
                        </Link>
                    </div>
                </div>
            ))}


        </InfiniteScroll>
    )
}