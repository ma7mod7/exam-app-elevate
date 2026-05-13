'use client'

import { ChevronsDownUp, Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { SearchAndFilterSchema, SearchAndFilterType } from '../schema/search-filter-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'




export default function SearchAndFilters() {
    const [isOpen, setIsOpen] = useState(true)
    const router = useRouter();
    const pathname = usePathname();
    const searchParams=useSearchParams()

    const { control, handleSubmit, reset } = useForm<SearchAndFilterType>({
        resolver: zodResolver(SearchAndFilterSchema),
        defaultValues: {
            searchTitle: "",
            Immutability: "all"
        }
    })
    
    const onSubmit: SubmitHandler<SearchAndFilterType> = (data) => {
        const params = new URLSearchParams(searchParams);
        if (data.searchTitle) params.set('search', data.searchTitle);
        else params.delete('search');

        if (data.Immutability !== "all") params.set('immutable', data.Immutability!);
        else params.delete('immutable');
        router.push(`${pathname}?${params.toString()}`);

    };
    const handleClear = () => {
        reset();
        router.push(pathname);
    };


    return (
        <div className="bg-white m-6 relative ">
            <div className="flex justify-between items-center text-white font-mono  px-6 bg-blue-600 py-4 ">
                <div className="flex justify-center items-center gap-1">
                    <SlidersHorizontal />
                    <p>
                        Search & Filters
                    </p>
                </div>
                <button onClick={() => setIsOpen(!isOpen)} type='button' className="flex justify-center items-center gap-1 cursor-pointer">
                    <ChevronsDownUp />
                    <p>
                        Hide
                    </p>
                </button>
            </div>
            {isOpen && (
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='m-6 space-y-3 p-4 '>
                        <Controller
                            control={control}
                            name='searchTitle'
                            render={({ field, fieldState }) => (
                                <Field>
                                    <div className="relative w-full">
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            id="input-field-search"
                                            type="text"
                                            placeholder="Search by title"
                                            className={cn(
                                                "rounded-none font-mono w-full border-2 border-gray-300 py-6 pr-12 outline-none transition-all",
                                                fieldState.invalid
                                                    ? "border-red-500 focus-visible:ring-1 focus-visible:ring-red-500"
                                                    : "focus-visible:ring-blue-500 focus-visible:ring-1 focus:border-blue-500"
                                            )}
                                        />


                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                            <Search className="h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>

                                    {fieldState.invalid && <FieldError className="text-red-600" errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            control={control}
                            name="Immutability"
                            render={({ field }) => (
                                <div >
                                    <Select onValueChange={field.onChange} value={field.value || "all"}>
                                        <SelectTrigger
                                            className={cn(
                                                "rounded-none font-mono w-82 border-2 border-gray-300 py-6 outline-none transition-all",
                                                "focus:ring-blue-500 focus:ring-1 focus:border-blue-500"
                                            )}
                                        >
                                            <SelectValue className='text-gray-400' placeholder="Immutability" />
                                        </SelectTrigger>

                                        <SelectContent position="popper" className="rounded-none font-mono  bg-white">
                                            <SelectItem value="all">None</SelectItem>
                                            <SelectItem value="false">Immutable</SelectItem>
                                            <SelectItem value="true">Mutable</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        />
                        <div className='absolute  right-9 bottom-4 font-mono'>

                            <Button onClick={handleClear} type='button' className='rounded-none cursor-pointer px-6 py-1 hover:bg-gray-300'>
                                clear
                            </Button>
                            <Button type='submit' className='bg-gray-400 hover:bg-gray-300 rounded-none cursor-pointer px-6 py-1'>
                                Apply
                            </Button>
                        </div>
                    </div>

                </form>
            )}
        </div>
    )
}










