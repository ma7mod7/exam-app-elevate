import HeaderAdmin from "@/app/shared/components/header-admin";
import SearchAndFilters from "@/app/shared/components/search-filters";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,

} from "@/components/ui/breadcrumb"
import AdminTable from "@/app/shared/components/admin-table";


export default  function DiplomaListAdmin() {


    return (
        <>
            <div className='flex flex-col w-full  bg-gray-100  '>
                <Breadcrumb className="p-4 px-6">
                    <BreadcrumbList>
                        <BreadcrumbItem className="text-gray-500 font-mono">
                            <BreadcrumbLink href="/admin-diploma">Diplomas</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <hr className="border-gray-300" />
                <div>
                    <HeaderAdmin actionTitle={'Add New Diploma'} />
                </div>
            </div>
            {/* search and filters */}
            <div>
                <SearchAndFilters />
            </div>
            {/* table of diplomas */}
            <div >
                <AdminTable />
            </div>
        </>
    )

}

