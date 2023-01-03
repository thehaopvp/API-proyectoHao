import {getCapitulos,createCapitulos, getCapituloId,changeCapitulos,deleteCapitulos} from "../controllers/capitulos.controller";
const express = require("express");
import {checktoken} from "../utils/check";
const router = express.Router();
const jwt = require("jsonwebtoken");


router.get("/",checktoken ,getCapitulos);
router.get("/:id",checktoken,getCapituloId);
router.post("/",checktoken,createCapitulos);
router.put("/:id",checktoken,changeCapitulos);
router.delete("/:id",checktoken,deleteCapitulos);



export default router;

