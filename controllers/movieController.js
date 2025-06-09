import tmdb from "../utils/tmdb.js"

const searchMovies = async (req,res) => {
    try {
        const { query, year } = req.query
        
        const response = await tmdb.get('/search/movie', {
            params: {
                query,
                year
            }
        })

        res.status(200).json({
            message: "Sucessful",
            movies:response.data.results
        })
    } catch(error) {
        res.status(500).json({message:error.message})
    }
}

const getPopularMovies = async (req, res) => {

    try {
        const response = await tmdb.get("/movie/popular")
        res.status(200).json({
            message: "Sucessful",
            movies:response.data.results
        })
    } catch (error) {
        res.status(500).json({message:error.message,error: error?.response?.data || error.message})
    }
}
 

const getMovieInfo = async (req, res) => {
    
    try {
        const { id } = req.params
        const response = await tmdb.get(`/movie/${id}`)
        
        res.status(200).json({
            message: "Sucessful",
            movie:response.data
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}



export {searchMovies,getPopularMovies,getMovieInfo}