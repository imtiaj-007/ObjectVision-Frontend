'use client'
import React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


interface PaginationControlsProps {
    currentPage: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
}) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const updatePage = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        router.push(`${pathname}?${params.toString()}`)
    }

    const updateLimit = (perPage: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('limit', perPage)
        params.delete('page')
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center space-x-2">
                <p className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                </p>
                <Select
                    onValueChange={updateLimit}
                    defaultValue={searchParams.get('limit') || '6'}
                >
                    <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue placeholder="12" />
                    </SelectTrigger>
                    <SelectContent>
                        {[6, 12, 18].map((size) => (
                            <SelectItem key={size} value={size.toString()}>
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updatePage(1)}
                    disabled={!hasPrevPage}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updatePage(currentPage - 1)}
                    disabled={!hasPrevPage}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium">
                    {currentPage}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updatePage(currentPage + 1)}
                    disabled={!hasNextPage}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updatePage(totalPages)}
                    disabled={!hasNextPage}
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
};