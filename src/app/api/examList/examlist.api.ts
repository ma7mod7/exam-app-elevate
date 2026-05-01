import { IApiResponse, IPaginatedResponse } from "@/lib/types/api";
import { IExam } from "@/lib/types/exam";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";




export async function getExamList(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token) {
        throw new Error("Next.js Error: No token found in cookies");
    }

    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 12;
    const diplomaId=req.nextUrl.searchParams.get('diplomaId')||''
    const response = await fetch(`https://exam-app.elevate-bootcamp.cloud/api/exams?diplomaId=${diplomaId}&page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token?.token}`
        }
    });
    
    const payload: IApiResponse<IPaginatedResponse<IExam>> = await response.json();
    if (payload.status === false) {
        throw new Error(payload.message);
    }

    
    return payload;
}
