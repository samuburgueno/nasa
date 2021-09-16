import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.nasa.gov/mars-photos/api/v1/'
});

export const getManifest = async ( rover ) => {
    const response = await api.get(`manifests/${rover}/?api_key=${process.env.REACT_APP_API_KEY}`)
    if(response.status === 200) {
        return response.data.photo_manifest
    }
}

export const get = async ( path ) => {
    const response = await api.get( path )
    if(response.status === 200) {
        return response.data
    }
}