const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { secret } = require("../settings");

router.get("/register", (req, resp) => resp.render("register"));
router.get("/login", (req, res) => res.render("login"));

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  await User.create({
    name,
    email,
    password_hash: hashedPassword,
  })
    .then(() => res.redirect("/auth/login"))
    .catch((err) => console.log(err));
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).send("Email is required");
  } else if (!password) {
    return res.status(400).send("Password is required");
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send("User not found");
    }
    const checkPassword = await bcrypt.compare(password, user.password_hash);
    if (!checkPassword) {
      return res.status(422).send("Invalid password");
    }

    const accessToken = jwt.sign({ id: user.id, email: user.email }, secret, {
      expiresIn: "1h",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "Strict",
    });

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error.");
  }
});

module.exports = router;
