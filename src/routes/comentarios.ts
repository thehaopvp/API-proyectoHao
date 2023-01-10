import {getCapitulos,createCapitulos} from "../controllers/capitulos.controller";
import { createComentario, getComentario } from "../controllers/comentario.controller";
import { checktAdmin } from "../utils/auth";
const express = require("express");
import {checktoken} from "../utils/check";
const router = express.Router();
const jwt = require("jsonwebtoken");


router.get("/:id",checktoken ,getComentario);
router.post("/",checktoken,createComentario);


export default router;
