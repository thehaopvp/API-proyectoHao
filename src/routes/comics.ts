
import {getComics,createComic, getComicId,changeComic,deleteComic,getComicsImg} from "../controllers/comics.controller";
import { checktAdmin } from "../utils/auth";
const express = require("express");
import {checktoken} from "../utils/check";
const router = express.Router();
const jwt = require("jsonwebtoken");


router.get("/",checktoken,getComics);
router.get("/img/:id" ,getComicsImg);
router.get("/:id",checktoken,getComicId);
router.post("/",checktoken, checktAdmin,createComic);
router.put("/:id",checktoken,checktAdmin,changeComic);
router.delete("/:id",checktoken,checktAdmin,deleteComic);



export default router;

