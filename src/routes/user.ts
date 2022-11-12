
import {getUser,createUser, getUserById,changeUser,deleteUser, loginUser,getMyUser} from "../controllers/auth.controller";
const express = require("express");
import {checktoken} from "../utils/check";

const router = express.Router();
const jwt = require("jsonwebtoken");



  

router.get("/",checktoken ,getUser);
router.get("/me",checktoken ,getMyUser);
router.get("/:id",checktoken ,getUserById);
router.post("/" ,createUser);
router.put("/",checktoken ,changeUser);
router.delete("/:id",checktoken ,deleteUser);
router.post("/login",loginUser);


export default router;


