import {getCapitulos,createCapitulos} from "../controllers/capitulos.controller";
import { createComentario, getAllComentario, getUsuarioImg } from "../controllers/comentario.controller";
import { checktAdmin } from "../utils/auth";
const express = require("express");
import {checktoken} from "../utils/check";
const router = express.Router();
const jwt = require("jsonwebtoken");


router.get("/list/:id",checktoken ,getAllComentario);
router.post("/",checktoken,createComentario);
router.get("/imagen/:id",getUsuarioImg);


export default router;
