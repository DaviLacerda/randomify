import axios from "axios";

export const api_key = process.env.NEXT_PUBLIC_API_KEY;

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
});