const jwt = require("jsonwebtoken");
const { secret } = require("../settings");

function authenticateToken(req, res, next) {
  const token = req.cookies.accessToken;
  console.log("Token:", token);

  if (!token) {
    return res.status(401).send("Access token missing.");
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    console.log("Token valid!");
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
