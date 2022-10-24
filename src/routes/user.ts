
import {getUser,createUser, getUserById,changeUser,deleteUser, loginUser} from "../controllers/auth.controller";
const express = require("express");
import {checktoken} from "../utils/check";
const router = express.Router();
const jwt = require("jsonwebtoken");


router.get("/",checktoken ,getUser);
router.get("/:id",checktoken ,getUserById);
router.post("/" ,createUser);
router.put("/:id",checktoken ,changeUser);
router.delete("/:id",checktoken ,deleteUser);
router.post("/login",loginUser);


export default router;


