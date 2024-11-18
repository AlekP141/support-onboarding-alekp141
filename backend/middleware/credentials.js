const allowedOrigins = require("../config/allowedOrigins")

// if the origin of the request is within the allowed origins list, set the header in the response so that CORS permits it
const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
}

module.exports = credentials
