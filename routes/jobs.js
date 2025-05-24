const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const authenticateToken = require("../middlewares/authMiddleware");


router.get("/detail/:id", authenticateToken, (req, res) =>
  Job.findOne({
    where: { id: req.params.id },
  })
    .then((job) => {
      res.render("detail", {
        job,
      });
    })
    .catch((err) => console.log(err))
);

router.get("/add", authenticateToken, (req, res) => {
  res.render("add");
});

router.post("/add", authenticateToken, (req, res) => {
  const { title, description, salary, company, email, new_job } = req.body;

  console.log("Request Body:", req.body);

  Job.create({
    title,
    description,
    salary,
    company,
    email,
    new_job,
  })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
