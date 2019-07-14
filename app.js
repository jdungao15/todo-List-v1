const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const app = express();
const path = require("path");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const items = ["Buy Food", "Cook food", "Eat Food"];

app.get("/", (req, res) => {
  let today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    kindOfDay: day,
    newListItems: items
  });
});

app.post("/", (req, res) => {
  item = req.body.newItem;

  items.push(item);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
