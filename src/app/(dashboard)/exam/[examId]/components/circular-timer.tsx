'use client'
import { useEffect, useState } from 'react';

// Props for the Timer component
interface CircularTimerProps {
    initialSeconds: number; // e.g., 313 seconds (05:13)
}

export default function CircularTimer({ initialSeconds }: CircularTimerProps) {
    const [timeLeft, setTimeLeft] = useState(initialSeconds);

    // Timer countdown logic
    useEffect(() => {
        if (timeLeft <= 0) return;
        // Create an interval that runs every 1000ms (1 second)
        const timerId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timerId); // Cleanup
    }, [timeLeft]);

    // Format time to MM:SS
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');

    // SVG Circle Math for the progress stroke
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    // Calculate how much of the circle should be empty based on time left
    const strokeDashoffset = circumference - (timeLeft / initialSeconds) * circumference;

    return (
        <div className="relative flex items-center justify-center w-20 h-20">
            {/* Background Circle (Light Gray) */}
            <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                    cx="40" cy="40" r={radius}
                    stroke="#E5E7EB" 
                    strokeWidth="6"
                    fill="transparent"
                />
                <circle
                    cx="40" cy="40" r={radius}
                    stroke="#2563EB" 
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-linear"
                />
            </svg>
            {/* Centered Time Text */}
            <span className="absolute font-mono text-sm font-semibold text-black">
                {minutes}:{seconds}
            </span>
        </div>
    );
}