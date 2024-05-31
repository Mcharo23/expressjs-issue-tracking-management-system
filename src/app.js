require("./db/mongoose");

const express = require("express");
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");

const app = express();

app.use(logger);

// Cross origin Resource Sharing
app.use(cors(corsOptions));

// built in middleware for formdata
app.use(express.urlencoded({ extended: false }));

// built-in middleware to handle urlencoded form data
app.use(express.json());

// serve static files
app.use("/", express.static(path.join(__dirname, "..", "/public")));

// service routes
// app.use("/", require("./routes/root"));

app.use("/", require("./routes/api/auth"));

app.use(verifyJWT);
app.use("/user", require("./routes/api/user"));
app.use("/project", require("./routes/api/project"));
app.use("/issue-type", require("./routes/api/issue-type"));
app.use("/issue", require("./routes/api/issue"));

app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("json")) {
    res.json({ detail: "404 Not Found" });
  } else if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(3000, (req, res) => {
  console.log("app is listening in port 3000");
});
