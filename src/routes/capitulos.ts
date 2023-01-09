import {getCapitulos,createCapitulos, getCapituloId,changeCapitulos,deleteCapitulos, siguienteCapitulo, anteriorCapitulo} from "../controllers/capitulos.controller";
import { checktAdmin } from "../utils/auth";
const express = require("express");
import {checktoken} from "../utils/check";
const router = express.Router();
const jwt = require("jsonwebtoken");


router.get("/list/:id",checktoken ,getCapitulos);
router.get("/:id",checktoken,getCapituloId);
router.post("/",checktoken,checktAdmin,createCapitulos);
router.put("/:id",checktoken,checktAdmin,changeCapitulos);
router.delete("/:id",checktoken,checktAdmin,deleteCapitulos);
router.get("/siguiente/:id",checktoken ,siguienteCapitulo);
router.get("/anterior/:id",checktoken ,anteriorCapitulo);

export default router;

