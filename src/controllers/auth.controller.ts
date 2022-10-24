import { usuarios } from "../models/auth";
import jwt from "jsonwebtoken";

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
    const user = await usuarios.findOne({
      where: { id },
    });
    if (!user) {
      res.status(404).json({ message: "No existe ese usuario " });
    } else {
      res.status(200).json({ ok: true, user });
    }
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
        res.json(token);

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
    const { nombre, password } = req.body;

    const nuevoUsuario = await usuarios.create({
      nombre,
      password,
    });
    res.status(200).json({ ok: true, nuevoUsuario });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const changeUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { nombre, password } = req.body;
    const user: any = await usuarios.findByPk(id);
    user.nombre = nombre;
    user.password = password;
    user.save();
    res.status(200).json({ ok: true, user });
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

function check(token: any, req: any, res: any) {
  try {
    var decoded = jwt.verify(token, "wrong-secret");
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

function checktoken(token: any, req: any, res: any) {
  try {
    var decoded = jwt.verify(token, "wrong-secret");
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

/*export const logout = async (req: any, res: any) => {
  try {
    req.session.destroy();
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};*/
