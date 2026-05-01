
'use server'
import { ChangeEmailFormValues } from "@/app/shared/schema/add-email-schema";
import { changePasswordType } from "@/app/shared/schema/strong-password-schema";
import { IApiResponse } from "@/lib/types/api";
import { IUser } from "@/lib/types/user";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";



export async function GetUserProfile() {
    const cookieStore = await cookies()
    const token = cookieStore.get("next-auth.session-token")?.value;
    const decodedToken = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })


    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/api/users/profile`, {
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
    const payload: IApiResponse<IUser> = await res.json();
    if (!payload.status) {
        throw new Error(payload.message || 'Something Is Wrong');
    }

    return payload.payload;
}



export async function UpdateUserProfile(data: { firstName: string, lastName: string, phone: string }) {
    const cookieStore = await cookies()
    const token = cookieStore.get("next-auth.session-token")?.value;
    const decodedToken = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })


    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/api/users/profile`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${decodedToken?.token}`
        },
        body: JSON.stringify(data)
    });


    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something Is Wrong');
    }
    const payload: IApiResponse<IUser> = await res.json();
    if (!payload.status) {
        throw new Error(payload.message || 'Something Is Wrong');
    }

    return payload.payload;
}




export async function DeleteUserProfile() {
    const cookieStore = await cookies()
    const token = cookieStore.get("next-auth.session-token")?.value;
    const decodedToken = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })


    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/api/users/account`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${decodedToken?.token}`
        }
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something Is Wrong');
    }
    const payload = await res.json();

    return payload;
}



export async function ChangeEmailRequest(newEmail:ChangeEmailFormValues) {
    const cookieStore = await cookies()
    const token = cookieStore.get("next-auth.session-token")?.value;
    const decodedToken = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })


    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/api/users/email/request`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${decodedToken?.token}`
        },
        body: JSON.stringify( newEmail )
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something Is Wrong');
    }
    const payload:{message: string,code: string} = await res.json();

    return payload;
}

export async function verifyEmail(code:string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("next-auth.session-token")?.value;
    const decodedToken = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })


    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/api/users/email/confirm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${decodedToken?.token}`
        },
        body: JSON.stringify({code})
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something Is Wrong');
    }
    const payload:{message: string,code: string} = await res.json();

    return payload;
}

export async function ChangeUserPassword(data:changePasswordType) {
    const cookieStore = await cookies()
    const token = cookieStore.get("next-auth.session-token")?.value;
    const decodedToken = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })


    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/api/users/change-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${decodedToken?.token}`
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something Is Wrong');
    }
    const payload:{message: string,code: string} = await res.json();

    return payload;
}