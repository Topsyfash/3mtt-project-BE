import axios from "axios";
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

     const enrichedMovies = await Promise.all(
      movies.slice(0, 10).map(async (movie) => {
        try {
          const omdbRes = await axios.get("http://www.omdbapi.com/", {
            params: {
              t: movie.title,
              apikey: process.env.OMDB_KEY,
            },
          });

          return {
            ...movie,
            imdbRating: omdbRes.data.imdbRating || "N/A",
            releaseYear: omdbRes.data.Year || "N/A",
          };
        } catch (error) {
          return {
            ...movie,
            imdbRating: "N/A",
            releaseYear: "N/A",
          };
        }
      })
    );
        
        res.status(200).json({
            message: "Sucessful",
            movies: enrichedMovies
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getPopularMovies = async (req, res) => {

    try {
        const response = await tmdb.get("/movie/popular")
        const popularMovies = response.data.results;
        
         const enrichedMovies = await Promise.all(
      popularMovies.slice(0, 15).map(async (movie) => {
        try {
          const omdbRes = await axios.get("http://www.omdbapi.com/", {
            params: {
              t: movie.title,
              apikey: process.env.OMDB_KEY,
            },
          });

          return {
            ...movie,
            imdbRating: omdbRes.data.imdbRating || "N/A",
            releaseYear: omdbRes.data.Year || "N/A",
          };
        } catch (error) {
          return {
            ...movie,
            imdbRating: "N/A",
            releaseYear: "N/A",
          };
        }
      })
    );

        res.status(200).json({
            message: "Sucessful",
            movies: enrichedMovies
        })
    } catch (error) {
        res.status(500).json({ message: error.message, error: error?.response?.data || error.message })
    }
}


const getMovieInfo = async (req, res) => {

    try {
    const { id } = req.params;

    const tmdbRes = await tmdb.get(`/movie/${id}`);
    const tmdbMovie = tmdbRes.data;

    const omdbRes = await axios.get(`http://www.omdbapi.com/`, {
      params: {
        t: tmdbMovie.title,
        apikey: process.env.OMDB_KEY,
      },
    });

    const imdbRating = omdbRes.data.imdbRating || "N/A";
    const releaseYear = omdbRes.data.Year || "N/A";

    res.status(200).json({
      message: "Successful",
      movie: tmdbMovie,
      imdbRating,
      releaseYear,
    });
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


        const enrichedMovies = await Promise.all(
      uniqueMovies.slice(0, 15).map(async (movie) => {
        try {
          const omdbRes = await axios.get("http://www.omdbapi.com/", {
            params: {
              t: movie.title,
              apikey: process.env.OMDB_KEY,
            },
          });

          return {
            ...movie,
            imdbRating: omdbRes.data.imdbRating || "N/A",
            releaseYear: omdbRes.data.Year || "N/A",
          };
        } catch (error) {
          return {
            ...movie,
            imdbRating: "N/A",
            releaseYear: "N/A",
          };
        }
      })
    );

        res.status(200).json({
            message: "Personalized recommendations",
            movies: enrichedMovies
        });
    } catch (error) {
        console.error(" Axios or TMDB error:", error);
        res.status(500).json({ message: error.message });
    }
};




export { searchMovies, getPopularMovies, getMovieInfo, getMovieTrailer, getMovieRecommendations }