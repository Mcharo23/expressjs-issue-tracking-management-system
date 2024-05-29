const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/itms")
  .then(() => {
    console.log("connection successful");
  })
  .catch((error) => {
    console.log("something wrong: ", error);
  });
