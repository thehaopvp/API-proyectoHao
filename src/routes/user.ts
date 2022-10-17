
import {getUser,createUser, getUserById,changeUser,deleteUser, loginUser} from "../controllers/auth.controller";
const express = require("express");
const router = express.Router();

router.get("/",getUser);
router.get("/:id",getUserById);
router.post("/",createUser);
router.put("/:id",changeUser);
router.delete("/:id",deleteUser);
router.post("/login",loginUser);
export default router;


