import { usePagination } from '../../hooks/usePagination';
import s from './styles/pagination.module.css';

type PaginationProps = {
    totalCount: number
    perPage: number
    current: number
    countPages: number
    onChangePage: (current: number, perPage: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ totalCount, perPage, current, countPages, onChangePage }) => {
    let totalPageCount = Math.ceil(totalCount / perPage)
    let pages = usePagination(totalCount, perPage, current, countPages)

    const onPageChange = (e: React.MouseEvent<HTMLElement>) => {
        let pageNumber = +(e.currentTarget.textContent || 1)

        onChangePage(pageNumber, perPage)
    }

    const onPrevious = () => {
        onChangePage(--current, perPage)
    }

    const onNext = () => {
        onChangePage(++current, perPage)
    }

    return (
        <div className={s.paginationContainer}>
            <ul className={s.pagination}>
                <li className={`${s.pageLink} ${(current === 1) ? s.notActive : ''}`} onClick={onPrevious}>
                    <span>Prev</span>
                </li>

                {pages.map((value, index) => (
                    <li className={`${s.pageLink} ${(current === value) ? s.active : ''}`} onClick={onPageChange} key={index}>
                        <span>{value}</span>
                    </li>
                ))}

                <li className={`${s.pageLink} ${(current === totalPageCount) ? s.notActive : ''}`} onClick={onNext}>
                    <span>Next</span>
                </li>
            </ul>
        </div>
    )
}