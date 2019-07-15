const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const date = require(__dirname + "/date.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const items = ["Buy Food", "Cook food", "Eat Food"];
let workItems = [];

app.get("/", (req, res) => {
  let day = date.getDay();

  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", (req, res) => {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", (req, res) => {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
