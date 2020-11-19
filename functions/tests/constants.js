const functions = {
  config: () => {
    return {
      autocomplete: {
        auth_token: "token",
        apikey: "key",
      },
    };
  },
};

const response = {
  status: (status) => {
    response.statusCode = status;
    return response;
  },
  send: ({ error, status, message }) => {
    response.body = {
      error: error,
      status: status,
      message: message,
    };
    return response;
  },
};

module.exports = {
  functions,
  response,
};
