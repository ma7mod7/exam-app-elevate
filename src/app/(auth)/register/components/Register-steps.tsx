'use client';

import { useState } from 'react';
import RegisterEmail from './add-email';
import VerifyOtp from './verify-otp';
import FormRegister from './form-data';
import StrongPassword from './strong-password';
import { RegisterFormData } from '@/lib/types/register';



export default function RegisterForm() {

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('')
    const [userRegisterData, setUserData] = useState<RegisterFormData | null>(null);


    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <>

            {step === 1 && (
                <RegisterEmail
                    setEmail={setEmail}
                    nextStep={nextStep}
                />
            )}

            {step === 2 && (
                <VerifyOtp
                    nextStep={nextStep}
                    prevStep={prevStep}
                    emailValue={email}
                />
            )}
            {step == 3 && (
                <FormRegister
                    emailValue={email}
                    nextStep={nextStep}
                    setUserData={setUserData}

                />
            )}
            {step == 4 && (
                <StrongPassword
                userData={userRegisterData}
                />
            )}
        </>
    );
}