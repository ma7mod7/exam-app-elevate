'use client'
import { useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import CircularTimer from "./circular-timer";
import { fetchExamQuestions, SubmitExamData } from "@/app/api/questions/questions.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ISubmitExamData } from "@/lib/types/questions";

export default function ExamQuestionUI({ examId, examTitle, diplomaTitle, diplomaId }: { examId: string; examTitle: string; diplomaTitle: string; diplomaId: string }) {
    const router = useRouter();

    const { data: questionsData, isLoading, isError } = useQuery({
        queryKey: ["exam-questions", examId],
        queryFn: () => fetchExamQuestions(examId),
    });

    const { mutate,isPending } = useMutation({
        mutationKey: ["exam-results", examId],
        mutationFn: (payload:ISubmitExamData) => SubmitExamData(payload),
    });

    const [startedAt] = useState(() => new Date().toISOString());
    // --- UI STATE ---
    const [currentIndex, setCurrentIndex] = useState(0);

    // Safely get the total number of questions (fallback to 0 if data is not there yet)
    const totalQuestions = questionsData?.length || 0;

    // Get the exact question object we are currently viewing
    const currentQuestionData = questionsData?.[currentIndex];

    // Check if we reached the end of the exam
    const isLastQuestion = currentIndex === totalQuestions - 1;

    // Calculate progress for the progress bar
    const progressPercentage = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

    // --- FORM STATE (react-hook-form) ---
    // The form will store data as { "questionId": "answerId" }
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<Record<string, string>>();

    // Watch the currently selected answer for THIS specific question ID
    // This allows us to disable the "Next" button if the user hasn't selected an answer yet
    const currentAnswer = watch(currentQuestionData?.id || "");

    // --- HANDLERS ---
    const onSubmitExam = (data: Record<string, string>) => {
        // Transform RHF object into the exact array payload format required by APIs
        const answersArray = Object.entries(data).map(([questionId, answerId]) => ({
            questionId,
            answerId
        }));

        const finalPayload = {
            examId: examId,
            answers: answersArray,
            startedAt: startedAt
        };

        mutate(finalPayload, {
            onSuccess: (data) => {
                const submissionId = data.submission.id;
                console.log("Exam submitted successfully, navigating to results page...");
                router.push(`/exam/${examId}/results?diplomaTitle=${encodeURIComponent(diplomaTitle)}&examTitle=${encodeURIComponent(examTitle)}&diplomaId=${diplomaId}&submissionId=${submissionId}`);
            },
            onError: (error:any) => {
                console.error("Failed to submit exam:", error);
                toast.error("Failed to submit exam. Please try again.");
            }
        });


    };


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
            </div>
        );
    }

    if (isError || !questionsData || questionsData.length === 0) {
        return <div className="text-center mt-20 text-red-500">Failed to load exam questions.</div>;
    }

    return (
        <div className="m-12 p-8 bg-white font-mono">
            <header className="flex justify-between items-end mb-4">
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
                        <span>{examTitle}</span>
                        <span>
                            Question <strong className="text-blue-600">{currentIndex + 1}</strong> of {totalQuestions}
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-gray-100 rounded-none overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>

                <div className="ml-6 border-l pl-6 border-gray-200">
                    <CircularTimer initialSeconds={313} />
                </div>
            </header>

            {/* --- WRAP IN FORM TAG --- */}
            <form onSubmit={handleSubmit(onSubmitExam)} className="mt-12">

                {/* Question Text */}
                <h1 className="text-3xl font-bold text-blue-600 mb-8 leading-snug">
                    {currentQuestionData?.text}
                </h1>

                {/* Answers List */}
                <div className="flex flex-col gap-4 relative">
                    {/* 👇 Changed from options.map to answers.map based on backend data */}
                    {currentQuestionData?.answers.map((answer) => {

                        // Check if this specific answer is currently selected
                        const isSelected = currentAnswer === answer.id;

                        return (
                            <label
                                key={answer.id}
                                className={`flex items-center p-4 cursor-pointer transition-colors border ${isSelected
                                    ? 'bg-blue-50 border-blue-200'
                                    : 'bg-gray-50 border-transparent hover:bg-gray-100'
                                    }`}
                            >
                                {/* Radio Input (Hidden visually, managed by RHF) */}
                                <input
                                    type="radio"
                                    value={answer.id}
                                    {...register(currentQuestionData.id, { required: "Please select an answer to continue" })}
                                    className="peer sr-only"
                                />

                                {/* Custom CSS Radio Circle for better UI */}
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-blue-600' : 'border-gray-300'
                                    }`}>
                                    <div className={`w-2.5 h-2.5 rounded-full bg-blue-600 transition-all ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                                        }`} />
                                </div>

                                {/* Answer Text */}
                                <span className="ml-4 text-gray-700 text-base font-medium">
                                    {answer.text}
                                </span>
                            </label>
                        )
                    })}
                </div>

                {/* Validation Error Message (Shows if user tricks the UI and tries to skip) */}


                {/* --- FOOTER / NAVIGATION --- */}
                <footer className="flex gap-4 mt-12">
                    <button
                        type="button"
                        disabled={currentIndex === 0}
                        onClick={() => setCurrentIndex(prev => prev - 1)}
                        className="flex-1 flex justify-center items-center gap-2 h-12 bg-gray-200 text-gray-600 font-bold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" /> Previous
                    </button>

                    {isLastQuestion ? (
                        // Submit Button (Only visible on the last question)
                        <button
                            type="submit"
                            disabled={!currentAnswer || isPending}
                            className="flex-1 flex justify-center items-center gap-2 h-12 text-white font-bold tracking-wide bg-green-600 hover:bg-green-700 transition-colors cursor-pointer disabled:bg-green-300 disabled:cursor-not-allowed"
                        >
                            {isPending ? 'Submitting...' : 'Submit Exam'}
                        </button>
                    ) : (
                        // Next Button
                        <button
                            type="button"
                            disabled={!currentAnswer} // Force user to answer before moving to next
                            onClick={() => setCurrentIndex(prev => prev + 1)}
                            className="flex-1 flex justify-center items-center gap-2 h-12 text-white font-bold tracking-wide bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            Next <ChevronRight className="w-5 h-5" />
                        </button>
                    )}
                </footer>
            </form>
        </div>
    );
}