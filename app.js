const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const path = require("path");
const db = require("./db/connection");
const bodyParser = require("body-parser");
const Job = require("./models/Job");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const PORT = 3000;

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//handle bars
app.set("views", path.join(__dirname, "views")); //diretorio das  views, onde ficam os templates do projeto
app.engine("handlebars", engine({ defaultLayout: "main" })); // arquivo principal do layout
app.set("view engine", "handlebars"); // biblioteca utilizada para renderizar as views

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully!");
  })
  .catch((err) => {
    console.error("Unable to connect to the databse:", err);
  });

app.get("/", (req, res) => {
  let search = req.query.job;
  let query = "%" + search + "%";

  if (!search) {
    Job.findAll({ order: [["createdAt", "DESC"]] })
      .then((jobs) => {
        res.render("index", { jobs });
      })
      .catch((err) => console.log(err));
  } else {
    Job.findAll({
      where: { title: { [Op.like]: query } },
      order: [["createdAt", "DESC"]],
    })
      .then((jobs) => {
        res.render("index", { jobs, search });
      })
      .catch((err) => console.log(err));
  }
});

app.use("/auth", require("./routes/auth"));
app.use("/jobs", require("./routes/jobs"));

Promise.all([db.sync({ alter: true })])
  .then(() => {
    console.log("Database synchronised successfully!");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Error synchronising database:", err);
  });
