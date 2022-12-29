import { usuarios } from "../models/auth";
import jwt from "jsonwebtoken";
const fs = require("fs");

export const getUser = async (req: any, res: any) => {
  try {
    const users = await usuarios.findAll();
    res.status(200).json({ ok: true, users });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getUserById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const user: any = await usuarios.findOne({
      where: { id },
    });
    if (!user) {
      res.status(404).json({ message: "No existe ese usuario " });
    } else {
      user.imagen = fs.readFileSync(
        "./../src/imagenes/perfil/" + user.imagen,
        "base64"
      );
      res.status(200).json({ ok: true, user });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getMyUser = async (req: any, res: any) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let user: any = jwt.decode(token);
    user = await usuarios.findOne({
      where: { nombre: user.nombre, password: user.password },
    });
    user.imagen = fs.readFileSync(
      "./../src/imagenes/perfil/" + user.imagen,
      "base64"
    );
    res.status(200).json({ ok: true, user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const changeUser = async (req: any, res: any) => {
  try {
    // const { id } = req.params;
    // const user: any = await usuarios.findByPk(id);
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let user: any = jwt.decode(token);
    user = await usuarios.findOne({
      where: { nombre: user.nombre, password: user.password },
    });
    const { nombre, password, imagen } = req.body;
    let data = imagen.replace(/^data:image\/\w+;base64,/, "");
    let buf = new Buffer(data, "base64");
    let nombreImagen = new Date().getTime() + ".png";
    fs.writeFile(
      "./../src/imagenes/perfil/" + nombreImagen,
      buf,
      function (err: any, result: any) {
        if (err) {
          console.log("error", err);
        }
      }
    );
    user.nombre = nombre;
    user.password = password;
    user.imagen = nombreImagen;
    user.save();
    res.status(200).json({ ok: true, user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const loginUser = async (req: any, res: any) => {
  try {
    const { nombre, password } = req.body;
    const user = await usuarios.findOne({
      where: { nombre },
    });
    if (user) {
      const pass = await usuarios.findOne({
        where: { password },
      });
      if (pass) {
        const user = {
          nombre: req.body.nombre,
          password: req.body.password,
        };

        let token = jwt.sign(user, "secretKey");
        res.status(200).json({ ok: true, token });
      } else {
        res.status(404).json({ message: "No existe ese usuario " });
      }
    } else {
      res.status(404).json({ message: "No existe ese usuario " });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createUser = async (req: any, res: any) => {
  try {
    let { nombre, password, imagen } = req.body;
    let data = imagen.replace(/^data:image\/\w+;base64,/, "");
    let buf = new Buffer(data, "base64");
    let nombreImagen = new Date().getTime() + ".png";
    fs.writeFile(
      "./../src/imagenes/perfil/" + nombreImagen,
      buf,
      function (err: any, result: any) {
        if (err) {
          console.log("error", err);
        }
      }
    );
    imagen = nombreImagen;
    const nuevoUsuario = await usuarios.create({
      nombre,
      password,
      imagen,
    });
    res.status(200).json({ ok: true, nuevoUsuario });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const comic = await usuarios.findOne({
      where: { id },
    });

    if (!comic) {
      res.status(404).json({ message: "No existe este usuario " });
    } else {
      await usuarios.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ message: "usuario eliminado correctamente" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

