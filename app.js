const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const routes = require("./routes/routes");
require("./config");

const app = express();

let port = process.env.PORT || 4000;
let publicPath = path.join(__dirname, "public");

app.use(express.json());
// app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(publicPath));
app.use("/app", routes);

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
