
import axios from "axios";

const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export async function fetchPhotos(query,page=1,per_page=20){
    const res = await axios.get('https://api.unsplash.com/search/photos', {
        params:{
            query,
            page,
            per_page
        },
        headers:{
            Authorization: `Client-ID ${UNSPLASH_API_KEY}`
        }
    })
    return res.data;
}

export async function fetchVideos(query,page=1,per_page=20){
    const res = await axios.get('https://api.pexels.com/videos/search', {
        params:{
            query,
            page,
            per_page
        },
        headers:{
            Authorization:PEXELS_API_KEY
        }
    })
    return res.data;
}