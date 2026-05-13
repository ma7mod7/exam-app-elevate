import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteDiploma, getAdminDiplomaById, getAdminDiplomas } from "../api/diploma/diploma-admin.api"
import { IAdminDiplomasFilters } from "@/lib/types/diploma-filters"


export const getFiltersFromParams = (searchParams: URLSearchParams) => {
    return {
        page: Number(searchParams.get('page')) || 1,
        search: searchParams.get('search') || undefined,
        immutable: searchParams.get('immutable') === 'true' ? true : 
        searchParams.get('immutable') === 'false' ? false : undefined,
        sortBy: searchParams.get('sortBy') || undefined,
        sortOrder: searchParams.get('sortOrder') || undefined,
    };
};

export const useAdminDiplomas=(filters:IAdminDiplomasFilters)=>{
    return useQuery({
        queryKey:['admin-diplomas',filters],
        queryFn:()=>getAdminDiplomas(filters),
        placeholderData: (previousData) => previousData,
    })
}

export const useGetAdminDiplomaId=(diplomaId:string)=>{
    return useQuery({
        queryKey:['admin-diplomas',diplomaId],
        queryFn:()=>getAdminDiplomaById(diplomaId),
        placeholderData: (previousData) => previousData,
    })
}



export const useDeleteDiploma=()=>{
    const queryClient = useQueryClient();
    return(
        useMutation({
            
            mutationFn:(diplomaId:string)=>deleteDiploma(diplomaId),
            onSuccess:()=>{
                queryClient.invalidateQueries({ queryKey: ['admin-diplomas'] });
            }
        })
    )
}



