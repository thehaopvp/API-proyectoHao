import {getCapitulos,createCapitulos} from "../controllers/capitulos.controller";
import { checktAdmin } from "../utils/auth";
const express = require("express");
import {checktoken} from "../utils/check";
const router = express.Router();
const jwt = require("jsonwebtoken");


router.get("/list/:id",checktoken ,getCapitulos);
router.post("/",checktoken,checktAdmin,createCapitulos);


export default router;
