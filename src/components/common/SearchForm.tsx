import s from "./styles/search.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";

import Icon from "./Icon";
import { Input } from "./Input";

type SearchProps = {
    fetchContact: (query: string) => void
    isResult: boolean
    delay?: number
}

export type SearchValues = {
    query: string
}

const SearchForm: React.FC<SearchProps> = (props) => {
    const { control, handleSubmit, getValues } = useForm<SearchValues>({ mode: "onBlur" })
    const [isClearBtnVisible, setIsClearBtnVisible] = useState(false)
    const debounce = require('lodash.debounce')

    useEffect(() => {
        return () => {
          debouncedResults.cancel();
        };
    });

    const SearchFormSubmit: SubmitHandler<SearchValues> = (data) => props.fetchContact(data.query)
 
    const onInput = () => {
        const query = getValues('query')
        const isBtnVisible = !isClearBtnVisible && !!query.length

        setIsClearBtnVisible(isBtnVisible)
        props.fetchContact(query)
    }

    const debouncedResults = useMemo(() => {
        return debounce(onInput, (props?.delay || 300))
    }, [])

    return (
        <form onSubmit={handleSubmit(SearchFormSubmit)} className={s.searchForm}>
            <div className={s.searchContainer}>
                <Icon icon="search" size={25} className={s.searchIcon} />

                <div className={s.searchInputContainer}>
                    <Input 
                        control={control} 
                        name="query" 
                        className={s.searchInput} 
                        onInput={debouncedResults}
                        placeholder="Enter to search..."
                    />
                </div>
            </div>
        </form>
    )
}

export default SearchForm