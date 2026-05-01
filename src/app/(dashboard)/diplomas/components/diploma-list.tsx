'use client'
import { DIPLOMA_KEYS } from "@/lib/constants/api.constant";
import { IApiResponse, IPaginatedResponse } from "@/lib/types/api";
import { IDiploma } from "@/lib/types/diploma";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from 'react'
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

export default function DiplomaList() {

    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;

    const { data: diplomasPages, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: DIPLOMA_KEYS.list(page, limit),
        queryFn: async ({ pageParam }) => {
            const res = await fetch(`/api/diploma?page=${pageParam}&limit=${limit} `);
            const data: IApiResponse<IPaginatedResponse<IDiploma>> = await res.json();
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

    const allDiplomas = useMemo(() => diplomasPages?.pages.flatMap(page => page.data) || [], [diplomasPages])

    if (isLoading) {
        return <h4>Loading...</h4>
    }

    return (
        <>
            <InfiniteScroll

                dataLength={allDiplomas.length} //This is important field to render the next data
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>End of list</b>
                    </p>
                }

            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

                    {allDiplomas.map((diploma) => (
                        <div key={diploma.id}>
                            <Link href={`diplomas/${diploma.id}?title=${diploma.title}`} className="block group  p-4 relative h-120  overflow-hidden rounded-none">
                                {diploma.image && (<Image src={diploma.image} alt="Diploma" fill priority className="object-cover
                                transition-transform duration-500 ease-in-out group-hover:scale-105 "
                                sizes="(max-width:768px) 90vw,400px"/>)}
                                <div
                                    className="absolute max-h-20 bottom-5 left-0 right-0 bg-blue-600/75 text-white p-2 m-2 
                                    transition-all duration-500 ease-in-out group-hover:max-h-50 overflow-hidden">

                                    <h2 className="text-lg font-semibold font-mono ">{diploma.title}</h2>
                                    <p className="text-gray-100 font-mono text-sm">
                                        {diploma.description}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>

        </>
    )
}