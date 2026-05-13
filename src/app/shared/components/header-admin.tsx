'use client'
import { getFiltersFromParams, useAdminDiplomas } from '@/app/hooks/use-get-admindiplomas';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface HeaderAdminProps {
    actionTitle: string;
}

export default function HeaderAdmin({ actionTitle }: HeaderAdminProps) {

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const filters = getFiltersFromParams(searchParams);
    const { data, isLoading } = useAdminDiplomas(filters);

    const metaData = data?.metadata;
    const totalCount = metaData?.total || 0;
    const pageSize = 12;
    const totalPages = metaData?.totalPages || 1;
    const currentPage = metaData?.page || 1;


    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    const from = (currentPage! - 1) * pageSize + 1;
    const to = Math.min(currentPage! * pageSize, totalCount!);
    if (isLoading) { return <div>loading data</div> }



    return (
        <div className="flex justify-between p-2 px-6 mt-6">
            <div className="flex items-center justify-center gap-6 font-mono text-sm">
                <div>
                    <span>{from} - {to}</span> of <span>{totalCount}</span>
                </div>
                <div className="flex items-center justify-center gap-4 border border-gray-300">
                    <button
                        onClick={() => handlePageChange(currentPage! - 1)}
                        disabled={currentPage === 1}
                        className="p-3 bg-gray-200 cursor-pointer hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-4 h-4 text-gray-500" />
                    </button>

                    <span className="px-2">page {currentPage} of {totalPages}</span>

                    <button
                        onClick={() => handlePageChange(currentPage! + 1)}
                        disabled={currentPage === totalPages}
                        className="p-3 bg-gray-200 cursor-pointer hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                    </button>
                </div>
            </div>

            <Link href={`/admin-diploma/admin-diploma-create`}>
                <div className="bg-green-600 flex items-center justify-center gap-2 text-white px-4 py-4 cursor-pointer rounded-none hover:bg-green-500 font-mono">
                    <Plus />
                    {actionTitle}
                </div>
            </Link>
        </div>
    )
}