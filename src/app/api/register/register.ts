
import { AddEmailFormValues } from "@/app/shared/schema/add-email-schema";
import { ResetStrongPasswordType } from "@/app/shared/schema/strong-password-schema";
import { FullUserData } from "@/lib/types/register";


export async function ConfirmEmail(data: AddEmailFormValues) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/api/auth/send-email-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something Is Wrong');
    }

    return await res.json();
}



export async function ConfirmOtp(data: {code:string,email:string}) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/api/auth/confirm-email-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something Is Wrong');
    }

    return await res.json();
}



export async function RegisterUser(data: FullUserData) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something Is Wrong');
    }

    return await res.json();
}



export async function ForgetPasswordSetEmail(data: AddEmailFormValues) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something Is Wrong');
    }

    return await res.json();
}


export async function setNewPassword(data: ResetStrongPasswordType&{token:string}) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something Is Wrong');
    }

    return await res.json();
}