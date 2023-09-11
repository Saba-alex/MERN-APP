const axios = require("axios");
const HttpError = require("../models/http.error");

const API_KEY = process.env.GOOGLE_API_KEY; //KEY FROM ENV 

async function getCoordsForAddress(adrress) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      adrress
    )}&key=${API_KEY}`
  );
  const data = response.data;
  if (!data || data.status === "ZERO_REQUESTS") {
    const error = new HttpError(
      "Could not find location for the specified  address",
      422
    );
    throw error;
  }

  const coordinates = data.result[0].geometry.location;

  return coordinates
}

module.exports = getCoordsForAddress;
