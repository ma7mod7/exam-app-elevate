import { IApiResponse, IPaginatedResponse } from "@/lib/types/api";
import { IDiploma } from "@/lib/types/diploma";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";




export async function getDiplomas(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token) {
        throw new Error("Next.js Error: No token found in cookies ❌");
    }

    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 12;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`https://exam-app.elevate-bootcamp.cloud/api/diplomas?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token?.token}`
        }
    });
    const payload: IApiResponse<IPaginatedResponse<IDiploma>> = await response.json();
    if (payload.status === false) {
        throw new Error(payload.message);
    }
    
    return payload;
}