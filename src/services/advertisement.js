import axios from 'axios'
const APIURL = 'http://localhost:5000/api/advertisements'

export const addAdvertisement = async(advertisement) => {
    const response = await axios.post(APIURL , advertisement);
    return response;
}

export const getAdvertisements = async() => {
    const response = await axios.get(APIURL);
    return response.data;
}