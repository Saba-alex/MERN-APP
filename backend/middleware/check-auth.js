const HttpError = "../models/http.error.js";
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if(req.method === 'OPTION'){
        return next();
    }
  try {
    const token = req.headers.authorization.split(" ")[1]; //Authorization:'Bearer token'
    if (!token) {
      throw new HttpError("Authentication failed");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY); //take 2 arg 1st the token sec our secret key
    req.userData = { userId: decodedToken.userId };
    next(); //continue to other path
  } catch (err) {
    const error = new HttpError("Authentication failed", 403);//403 Unauth 
    return next(error);
  }
  res(201).json();
};
