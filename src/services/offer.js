import axios from "axios";
const APIURL = "http://localhost:5000/api/offers";

export const addOffer = async (offer) => {
  const response = await axios.post(APIURL, offer);
  return response;
};

export const getOffers = async () => {
  const response = await axios.get(APIURL);
  return response.data;
};
