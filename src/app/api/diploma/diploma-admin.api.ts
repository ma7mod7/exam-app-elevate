'use server'

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { IAdminDiplomasFilters } from "@/lib/types/diploma-filters";
import { IApiResponse, IPaginatedResponse } from "@/lib/types/api";
import { IDiploma, ISpecificDiploma } from "@/lib/types/diploma";



export async function getAdminDiplomas(filters: IAdminDiplomasFilters) {
    const cookieStore = await cookies()
    const token = cookieStore.get("next-auth.session-token")?.value;
    const decodedToken = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const params = new URLSearchParams({
        page: (Number(filters.page) || 1).toString(),
        limit: (Number(filters.limit) || 12).toString(),
    });

    if (filters.search) params.append("search", filters.search);
    if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);
    if (filters.sortBy) params.append("sortBy", filters.sortBy);
    if (filters.immutable !== undefined && filters.immutable !== null) {
        params.append("immutable", String(filters.immutable));
    }
    
    const url = `${baseUrl}/api/diplomas?${params.toString()}`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${decodedToken?.token}`
        },
    })
    const payload: IApiResponse<IPaginatedResponse<IDiploma>> = await res.json();
    if (payload.status === false) {
        throw new Error(payload.message);
    }
    return payload.payload
}

export async function getAdminDiplomaById(diplomaId:string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("next-auth.session-token")?.value;
    const decodedToken = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const url = `${baseUrl}/api/diplomas/${diplomaId}`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${decodedToken?.token}`
        },
    })
    const payload: IApiResponse<ISpecificDiploma> = await res.json();
    if (payload.status === false) {
        throw new Error(payload.message);
    }
    return payload.payload
}




export async function deleteDiploma(diplomaId:string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("next-auth.session-token")?.value;
    const decodedToken = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const url = `${baseUrl}/api/diplomas/${diplomaId}`;
    console.log("url of delete",url)
    const res = await fetch(url, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${decodedToken?.token}`
        },
    })
    const payload:{message:string} = await res.json();
    console.log(payload)
    return payload.message
}


