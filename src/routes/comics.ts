
import {getComics,createComic, getComicId,changeComic,deleteComic} from "../controllers/comics.controller";
const express = require("express");
import {checktoken} from "../utils/check";
const router = express.Router();
const jwt = require("jsonwebtoken");


router.get("/",checktoken ,getComics);
router.get("/:id",checktoken,getComicId);
router.post("/",checktoken,createComic);
router.put("/:id",checktoken,changeComic);
router.delete("/:id",checktoken,deleteComic);



export default router;

