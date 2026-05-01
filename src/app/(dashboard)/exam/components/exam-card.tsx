'use client' 
import { CircleQuestionMark, Timer } from "lucide-react";
import { useState } from "react";

interface ExamCardProps{
    title:string,
    duration:number,
    questionsCount:number,
    description:string

}
export default function ExamCard({ title,duration,questionsCount,description }: ExamCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const fullText = description || " nothing";
    const maxLength = 250;
    const shouldTruncate = fullText.length > maxLength;
    const displayText = isExpanded ? fullText : fullText.slice(0, maxLength);

    return (
        <div className="relative w-full group">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold font-mono text-blue-600">{title}</h2>
                <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                        <CircleQuestionMark width={20} height={20} />
                        <p><span>{questionsCount}</span>  Questions</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                        <Timer width={20} height={20} />
                        <p><span>{duration}</span>  Mins</p>
                    </div>
                </div>
            </div>

            <p className="text-gray-400 mt-2">
                {displayText}

                {!isExpanded && shouldTruncate && <span>... </span>}

                {shouldTruncate && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-600 hover:underline font-medium ml-1 cursor-pointer"
                    >
                        {isExpanded ? "See Less" : "See More"}
                    </button>
                )}
            </p>

        </div>
    );
}
