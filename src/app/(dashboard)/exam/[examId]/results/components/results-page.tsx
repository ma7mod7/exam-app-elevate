'use client'

import { RotateCcw, FolderOpen } from "lucide-react";
import { Pie, PieChart, Cell } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { GetSubmissions } from "@/app/api/questions/questions.api";



const incorrectAnswers = 5;

const chartData = [
    { name: "Correct", value: 5, color: "#10b981" }, 
    { name: "Incorrect", value: incorrectAnswers, color: "#ef4444" }, 
];

const chartConfig = {
    correct: { label: "Correct", color: "#10b981" },
    incorrect: { label: "Incorrect", color: "#ef4444" },
} satisfies ChartConfig;

const reviewQuestions = [
    {
        id: 1,
        question: "What does CSS stand for?",
        selectedAnswer: "Computer Style Sheets",
        correctAnswer: "Cascading Style Sheets",
        isCorrect: false,
    },
    {
        id: 2,
        question: "What does CSS stand for?",
        selectedAnswer: "Computer Style Sheets",
        correctAnswer: "Cascading Style Sheets",
        isCorrect: false,
    },
    {
        id: 3,
        question: "What does CSS stand for?",
        selectedAnswer: "Computer Style Sheets",
        correctAnswer: "Cascading Style Sheets",
        isCorrect: false,
    },
];

export default function ExamResultsUI({ examTitle, submissionId }: { examTitle: string; submissionId: string }) {
    const {data:results,isError,error}=useQuery({
        queryKey:["exam-results",submissionId],
        queryFn:()=>GetSubmissions(submissionId),
    })

    if(isError){
        console.error("Error fetching exam results");
        return <div className="text-center mt-20 text-red-500">Error: {(error).message}</div>;
    }
    const correctAnswers=results?.analytics.filter((item)=>item.isCorrect)
    const totalQuestions=results?.analytics.length;

    return (
        <div className=" m-10 p-8 bg-white  font-mono">

            
            <header className="mb-8">
                <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
                    <span>{examTitle}</span>
                    <span>
                        Question <strong className="text-blue-600">{totalQuestions}</strong> of {totalQuestions}
                    </span>
                </div>
                
                <div className="w-full h-4 bg-blue-600" />
            </header>

            <h1 className="text-3xl font-bold text-blue-600 mb-6">Results:</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-120">

                <div className="bg-blue-50/50 border border-blue-100 flex flex-col items-center justify-center p-6 h-full">

                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square w-full max-w-62.5 mb-8"
                    >
                        <PieChart>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={60} // This creates the "Donut" hole
                                outerRadius={90}
                                strokeWidth={0} // No border between slices
                            >
                                {chartData.map((entry, index) => (
                                    
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ChartContainer>

                    {/* Custom Legend (Matching your design) */}
                    <div className="flex flex-col gap-3 w-full max-w-37.5">
                        <div className="flex items-center gap-3 font-semibold text-sm">
                            <div className="w-4 h-4 bg-emerald-500" />
                            <span>Correct: {correctAnswers?.length}</span>
                        </div>
                        <div className="flex items-center gap-3 font-semibold text-sm">
                            <div className="w-4 h-4 bg-red-500" />
                            <span>Incorrect: {totalQuestions!-correctAnswers?.length}</span>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 border border-dashed border-blue-200 p-6 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    <div className="flex flex-col gap-8">
                        {results?.analytics.map((q, index) => (
                            <div key={index} className="flex flex-col gap-3">
                                <h2 className="text-lg font-bold text-blue-600 mb-1">
                                    {q.questionText}
                                </h2>

                                {!q.isCorrect && (
                                    <div className="flex items-center p-3 bg-red-50">
                                        <div className="w-4 h-4 rounded-full border border-red-500 flex items-center justify-center ml-2 mr-3">
                                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                                        </div>
                                        <span className="text-gray-800 text-sm">{q.selectedAnswer.text}</span>
                                    </div>
                                )}

                                <div className="flex items-center p-3 bg-emerald-50">
                                    <div className="w-4 h-4 rounded-full border border-emerald-500 flex items-center justify-center ml-2 mr-3">
                                    </div>
                                    <span className="text-gray-800 text-sm">{q.correctAnswer.text}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            
            <footer className="flex gap-4 mt-6">
                <button className="flex-1 flex justify-center items-center gap-2 h-12 bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors">
                    <RotateCcw className="w-4 h-4" /> Restart
                </button>

                <button className="flex-1 flex justify-center items-center gap-2 h-12 text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors">
                    <FolderOpen className="w-4 h-4" /> Explore
                </button>
            </footer>

        </div>
    );
}