'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowDownWideNarrow, Ellipsis } from "lucide-react";
import { SortMenu } from "./sort-menu";
import { useSearchParams } from "next/navigation";
import { getFiltersFromParams, useAdminDiplomas } from "@/app/hooks/use-get-admindiplomas";
import Image from "next/image";
import { CrudDiploma } from "./crud-diploma-menu";


export default function AdminTable() {
    const searchParams = useSearchParams();
    const filters = getFiltersFromParams(searchParams);
    const { data, isLoading } = useAdminDiplomas(filters);
    const diplomaList = data?.data
    console.log(diplomaList)
    if (isLoading) {
        return <div>loading .....</div>
    }
    return (
        <>

            <div className="mt-6 bg-white m-6">
                <Table className="table-fixed w-full border-collapse">
                    <TableHeader className="bg-blue-500 font-mono text-white">
                        <TableRow>
                            <TableHead className="w-18">Image</TableHead>
                            <TableHead className="w-40">Title</TableHead>
                            <TableHead className="w-150">Description</TableHead>
                            <TableHead className="w-25 text-right">
                                <SortMenu>
                                    <button className="flex gap-1 text-center  ml-22 cursor-pointer">
                                        <p>sort</p>
                                        <ArrowDownWideNarrow size={20} />
                                    </button>
                                </SortMenu>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    {diplomaList?.map((diploma, id) => {
                        return (
                            <TableBody key={id}>
                                <TableRow>
                                    <TableCell className="w-25">
                                        <Image src={diploma.image || ""} alt="Logo" width={192} height={37} />
                                    </TableCell>

                                    <TableCell className="w-40">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <p> {diploma.title} </p>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-black rounded-none text-white">
                                                    <p>{diploma.title}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>

                                    <TableCell className="w-150 whitespace-normal wrap-break-words leading-relaxed ">
                                        {diploma.description}
                                    </TableCell>

                                    <TableCell className="w-25 text-right">
                                        <CrudDiploma diplomaId={diploma.id} diplomaTitle={diploma.title} >
                                            <button className="bg-gray-300 hover:bg-gray-200 p-2 cursor-pointer">
                                                <Ellipsis size={14} />
                                            </button>
                                        </CrudDiploma>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )
                    })}
                </Table>
            </div>
        </>
    )

}


