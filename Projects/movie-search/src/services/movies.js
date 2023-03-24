const API_KEY = import.meta.env.VITE_API_KEY

export const searchMovies = async ({ search }) => {
    if (search === '') return null

    console.log(API_KEY)
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()

        const movies = json.Search

        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            image: movie.Poster
        }))

    } catch (e) {
        throw new Error('Error when searching movies')
    }
}