const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use("/auth", require("./router/auth_router"));
app.use("/", require("./router/router"));

// connect to mongoDB

mongoose.connect(
  process.env.MDB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to mongoDB");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server in ascolto sulla porta ${port}`));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
