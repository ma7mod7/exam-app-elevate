'use client';

import { useState } from 'react';


import VerifyOtpChangeEmail from './verify-otp-change-email';
import ChangeEmail from './change-email-';



export default function ChangeEmailSteps({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('')  


    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <>

            {step === 1 && (
                <ChangeEmail
                    nextStep={nextStep}
                    setEmail={setEmail}
                    setIsOpen={setIsOpen}
                />
            )}

            {step === 2 && (
                <VerifyOtpChangeEmail
                    emailValue={email}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    setIsOpen={setIsOpen}
                />
            )}

        </>
    );
}