const express = require("express");
const router = express.Router();
const Job = require("../models/Job");


router.get("/test", (req, res) => {
  res.send("test");
});

//detalhe da vaga - view
router.get("/detail/:id", (req, res) =>
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

router.get("/add", (req, res) => {
  res.render("add");
});

router.post("/add", (req, res) => {
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
