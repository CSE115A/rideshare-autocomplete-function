const functions = require("firebase-functions");
const { getPredictions } = require("./middleware/google");
const { authenticateToken } = require("./middleware/middleware");

exports.autocomplete = functions.https.onRequest(async (request, response) => {
  const { query, headers } = request;
  if (Object.keys(query).length === 0 || query.input === "") {
    return response.status(400).send({
      error: true,
      status: 400,
      message: "Missing or Incorrect Params",
    });
  }
  const { isAuthError, authStatusCode, authMessage } = authenticateToken({
    functions,
    headers,
  });

  if (isAuthError) {
    return response.status(401).send({
      error: isAuthError,
      status: authStatusCode,
      message: authMessage,
    });
  }

  return await getPredictions({
    input: query.input,
    functions,
  })
    .then((res) => {
      return response.status(200).send({
        error: false,
        status: 200,
        message: res.message,
      });
    })
    .catch((err) => {
      return response.status(500).send({
        error: true,
        status: 500,
        message: err.message,
      });
    });
});
