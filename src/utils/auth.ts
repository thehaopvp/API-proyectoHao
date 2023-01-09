const jwt = require("jsonwebtoken");
import { usuarios } from "../models/auth";
const fs = require("fs");

export async function checktAdmin(req:any, res:any, next:any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let user: any = jwt.decode(token);
  user = await usuarios.findOne({
    where: { nombre: user.nombre, password: user.password },
  });
  try {
    if (user.role == "ADMIN") {
      return next();
    } else {
      res.status(404).json({ message: "Usuario no es Admin " });
    }
  } catch (error) {
    res.status(500).json({ error: "Usuario no es Admin " });
  }
}

