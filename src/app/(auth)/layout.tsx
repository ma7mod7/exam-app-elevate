
import { BookOpenCheck, Brain, FolderCode, RectangleEllipsis } from 'lucide-react';

interface WebsiteLayoutProps {
    children: React.ReactNode;
}

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
    return (
        <div className="flex  h-screen ">
            <div className="relative w-1/2  bg-blue-50 overflow-hidden">
                <div className="absolute w-100 h-100 bg-blue-100 top-10 right-4 rounded-full blur-3xl overflow-hidden"></div>
                <div className="absolute w-100 h-100 bg-blue-100  -bottom-24 left-2 rounded-full blur-3xl overflow-hidden"></div>

                <div className='absolute  z-10 flex  flex-col h-full w-full justify-center items-start px-36'>
                    <div className="flex items-center gap-2 mb-12">
                        <FolderCode className='text-blue-600' />
                        <h1 className="text-xl font-semibold font-mono text-blue-600">Exam App</h1>
                    </div>
                    <div className="flex flex-col mb-32 ">

                        <div className='mt-16'>
                            <p className='text-3xl w-2/3 font-bold text-black'>
                                Empower your learning journey with our smart exam platform.
                            </p>
                        </div>

                        <div className='flex gap-5 mt-16 font-mono'>
                            <Brain className='border border-blue-600  text-blue-600 p-0.5' />
                            <div className='flex flex-col gap-2'>
                                <p className='text-blue-600 text-xl font-semibold '>
                                    Tailored Diplomas
                                </p>
                                <p className='text-gray-700 w-2/3'>
                                    Choose from specialized tracks like Frontend, Backend, and Mobile Development.
                                </p>
                            </div>
                        </div>

                        <div className='flex gap-5 mt-9 font-mono'>
                            <BookOpenCheck className='border border-blue-600  text-blue-600 p-0.5' />
                            <div className='flex flex-col gap-2'>
                                <p className='text-blue-600 text-xl font-semibold '>
                                    Focused Exams
                                </p>
                                <p className='text-gray-700 w-2/3'>
                                    Access topic-specific tests including HTML, CSS, JavaScript, and more.
                                </p>
                            </div>
                        </div>

                        <div className='flex gap-5 mt-9 font-mono'>
                            <RectangleEllipsis className='border border-blue-600  text-blue-600 p-0.5' />
                            <div className='flex flex-col gap-2'>
                                <p className='text-blue-600 text-xl font-semibold '>
                                    Smart Multi-Step Forms
                                </p>
                                <p className='text-gray-700 w-2/3'>
                                    Choose from specialized tracks like Frontend, Backend, and Mobile Development.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="relative w-1/2 h-full flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}
