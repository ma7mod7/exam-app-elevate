'use client';

import { useState } from 'react';
import ForgetPassword from './forget-password-input';
import PasswordResetSent from './password-reset-sent';


export default function ForgetPasswordSteps() {

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('')

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <>

            {step === 1 && (
                <ForgetPassword
                    setEmail={setEmail}
                    nextStep={nextStep}
                />
            )}

            {step === 2 && (
                <PasswordResetSent
                    emailValue={email}
                    prevStep={prevStep}
                />
            )}


        </>
    );
}