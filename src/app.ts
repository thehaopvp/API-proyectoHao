import express from "express";
import user from "./routes/user";
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors')

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", user);

export default app;
