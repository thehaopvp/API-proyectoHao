
const express = require("express");
import {checktokens} from "../utils/check";
const router = express.Router();
const jwt = require("jsonwebtoken");


router.get("/",checktokens);


export default router;
