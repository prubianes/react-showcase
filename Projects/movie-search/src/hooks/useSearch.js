import { useEffect, useRef, useState } from 'react'


export function useSearch() {
    const [search, updateSearch] = useState('')
    const [error, setError] = useState(null)

    const isFirstInput = useRef(true)

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = search === ''
            return
        }

        if (search === '') {
            setError("Can't find a Movie")
            return
        }

        if (search.length < 3) {
            setError('Must enter 3 characters')
            return
        }

        setError(null)
    }, [search])

    return { search, updateSearch, error }
}