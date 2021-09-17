import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.nasa.gov/mars-photos/api/v1/',
    params: {
        api_key: process.env.REACT_APP_API_KEY
    }
});

export const get = async ( { path, params } ) => {
    const response = await api.get( path, { params } )
    if(response.status === 200) {
        return response.data
    }
}