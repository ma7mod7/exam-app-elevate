'use server'
import { IApiResponse } from "@/lib/types/api";
import { IExamSubmission, IExamSubmissionsResponse, IQuestions, ISubmitExamData } from "@/lib/types/questions";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function fetchExamQuestions(examId: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("next-auth.session-token")?.value;
    const decodedToken = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${baseUrl}/api/questions/exam/${examId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${decodedToken?.token}`
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something Is Wrong');
    }

    const data: IApiResponse<IQuestions> = await res.json();
    if (!data.status) {
        throw new Error(data.message || 'Something Is Wrong');
    }
    return data.payload.questions;
}


export async function SubmitExamData(payload: ISubmitExamData) {
    const cookieStore = await cookies()
    const token = cookieStore.get("next-auth.session-token")?.value;
    const decodedToken = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;


    const res = await fetch(`${baseUrl}/api/submissions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${decodedToken?.token}`
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to submit exam');
    }

    const data:IApiResponse<IExamSubmissionsResponse> = await res.json();
    if (!data.status) {
        throw new Error(data.message || 'Failed to submit exam');
    }
    return data.payload;
}



export async function GetSubmissions(submissionId: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("next-auth.session-token")?.value;
    const decodedToken = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;


    const res = await fetch(`${baseUrl}/api/submissions/${submissionId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${decodedToken?.token}`
        },
        
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to submit exam');
    }

    const data: IApiResponse<IExamSubmission> = await res.json();
    if (!data.status) {
        throw new Error(data.message || 'Failed to fetch exam results');
    }
    console.log(data)
    return data.payload;
}
