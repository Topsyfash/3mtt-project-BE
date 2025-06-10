import axios from "axios";
import dotenv from "dotenv"

dotenv.config()

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = process.env.API_KEY
const ACCESS_TOKEN = process.env.TMDB_API_KEY

const tmdb = axios.create({
    baseURL: TMDB_BASE_URL,
    timeout: 10000,
     headers: {
    Authorization: ACCESS_TOKEN,
  },
    // params: {
    //     api_key: API_KEY
    // }
});

export default tmdb