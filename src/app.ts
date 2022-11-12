import express from "express";
import user from "./routes/user";
import comics from "./routes/comics";
import token from "./routes/token";
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  session({
    secret: "1234",
    resave: true,
    saveUninitialized: false,
  })
);

app.use(bodyParser({limit: '50mb'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", user);
app.use("/comics", comics);
app.use("/checktoken", token);
export default app;
