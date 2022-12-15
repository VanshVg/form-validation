const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/form";

module.exports = mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  console.log("Db Connected");
});
