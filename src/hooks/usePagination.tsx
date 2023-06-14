import { useMemo } from "react"

export const usePagination = (
    totalCount: number,
    perPage: number,
    current: number,
    count: number
): Array<number> => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / perPage)

        if (totalPageCount <= count) {
            return Array.from({ length: totalPageCount }, (_, index) => ++index)
        }
    
        let half = Math.trunc(count / 2)
        let start = Math.max(current - half, 1)
        let end = start + count - 1
    
        if (end > totalPageCount) {
            start = start - (end - totalPageCount)
        }
    
        return Array.from({ length: count }, (_, index) => start + index)
    }, [totalCount, perPage, current, count])
    
    return paginationRange
}