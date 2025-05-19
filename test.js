const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const secret = process.env.SECRET;
console.log(secret);
const token = jwt.sign({ id: "123", email: "giulia@gmail.com" }, secret, {
  expiresIn: "1h",
});


console.log(secret);
