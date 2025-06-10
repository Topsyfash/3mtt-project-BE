import FavoriteMovie from "../models/favoriteMovieModel.js"
import tmdb from "../utils/tmdb.js"

const searchMovies = async (req, res) => {
    try {
        const { query, year } = req.query

        if (!query) {
            return res.status(400).json({ message: "Query parameter is required." });
        }

        const response = await tmdb.get('/search/movie', {
            params: {
                query,
                year
            }
        })

        let movies = response.data.results;

        movies.sort((a, b) => {
            const dateA = new Date(a.release_date);
            const dateB = new Date(b.release_date);
            return dateB - dateA;
        });

        res.status(200).json({
            message: "Sucessful",
            movies: movies
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getPopularMovies = async (req, res) => {

    try {
        const response = await tmdb.get("/movie/popular")
        res.status(200).json({
            message: "Sucessful",
            movies: response.data.results
        })
    } catch (error) {
        res.status(500).json({ message: error.message, error: error?.response?.data || error.message })
    }
}


const getMovieInfo = async (req, res) => {

    try {
        const { id } = req.params
        const response = await tmdb.get(`/movie/${id}`)

        res.status(200).json({
            message: "Sucessful",
            movie: response.data
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const getMovieTrailer = async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = await tmdb.get(
            `/movie/${id}/videos?language=en-US`
        );

        const trailer = data.results.find(
            (v) => v.type === 'Trailer' && v.site === 'YouTube'
        );

        if (!trailer) {
            return res.status(404).json({ message: 'Trailer not found' });
        }
        res.json({ trailer });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch trailer',
            error
        });
    }
}


const getMovieRecommendations = async (req, res) => {

    try {
        const favorites = await FavoriteMovie.find({ userId: req.user.id });


        const favoriteIds = favorites.map((fav) => fav.movieId);

        let recommendedMovies = [];

        for (const movieId of favoriteIds.slice(0, 5)) {
            if (!movieId || isNaN(movieId)) {
                console.warn(`Invalid TMDB movieId:`, movieId);
                continue;
            }
            const response = await tmdb.get(`/movie/${movieId}/recommendations`);
            recommendedMovies.push(...response.data.results);
        }

        const seen = new Set();
        const uniqueMovies = recommendedMovies.filter((movie) => {
            if (seen.has(movie.id)) return false;
            seen.add(movie.id);
            return true;
        });

        res.status(200).json({
            message: "Personalized recommendations",
            movies: uniqueMovies.slice(0, 20),
        });
    } catch (error) {
        console.error(" Axios or TMDB error:", error);
        res.status(500).json({ message: error.message });
    }
};




export { searchMovies, getPopularMovies, getMovieInfo, getMovieTrailer, getMovieRecommendations }