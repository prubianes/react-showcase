import { useCallback, useState } from 'react'
import { useSearch } from './hooks/useSearch'
import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import debounce from 'just-debounce-it'

function App() {
    const [sort, setSort] = useState(false)

    const { search, updateSearch, error } = useSearch()
    const { movies, loading, getMovies } = useMovies({ search, sort })

    const debouncedGetMovies = useCallback(
        debounce(search => {
            console.log('search', search)
            getMovies({ search })
        }, 300)
        , [getMovies]
    )

    const handleSubmit = (event) => {
        event.preventDefault()
        getMovies({ search })
    }

    const handleSort = () => {
        setSort(!sort)
    }

    const handleChange = (event) => {
        const newSearch = event.target.value
        updateSearch(newSearch)
        debouncedGetMovies(newSearch)
    }

    return (
        <div className='page'>
            <header>
                <h1>Movie Search</h1>
                <form className='form' onSubmit={handleSubmit}>
                    <input
                        style={{
                            border: '1px solid transparent',
                            borderColor: error ? 'red' : 'transparent'
                        }} onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix...'
                    />
                    <input type='checkbox' onChange={handleSort} checked={sort} />
                    <button type='submit'>Search</button>
                </form>
            </header>

            <main>
                {
                    loading ? <p>Loading...</p> : <Movies movies={movies} />
                }
            </main>
        </div>
    )
}

export default App
