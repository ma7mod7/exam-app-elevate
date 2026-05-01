import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PasswordResetSentProps {
    emailValue: string,
    prevStep: () => void
}

export default function PasswordResetSent({ emailValue, prevStep }: PasswordResetSentProps) {

    return (
        <div className="mb-20">
            <button onClick={prevStep} className="border py-1 px-3 text-gray-400  w-fit cursor-pointer">
                <ArrowLeft className="text-black" />
            </button>

            <div className="flex flex-col gap-6 mt-14 " >

                <h1 className="font-bold text-3xl">
                    Password Reset Sent
                </h1>
                <p className="font-mono ">
                    We have sent a password reset link to:<br />
                    <span className="text-blue-600">
                        {emailValue}
                    </span>
                </p>
                <p className="font-mono w-2/3">
                    Please check your inbox and follow the instructions to reset your password.
                </p>
                <p className="text-gray-500 font-mono w-2/3">
                    If you  don&#39;t see the email within a few minutes, check your spam or junk folder.
                </p>
                <Link href="register" className="flex items-center  gap-1 text-gray-600 mt-8 text-sm  ">
                    Don&#39;t have an account?  <p className="text-blue-600 hover:underline ml-0.5">Create yours</p>
                </Link>
            </div>
        </div>
    )


}