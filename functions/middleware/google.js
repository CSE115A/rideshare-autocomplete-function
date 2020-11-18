const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});

exports.getPredictions = async ({ functions, input }) => {
  const apiKey = functions.config().autocomplete.apikey;
  return await client
    .placeAutocomplete({
      params: { input: input, key: apiKey },
    })
    .then((res) => {
      return Promise.resolve({
        status: 200,
        message: res.data.predictions,
      });
    })
    .catch((err) => {
      return Promise.reject(
        new Error(`Google Error: ${err.data.error_message}`),
      );
    });
};
