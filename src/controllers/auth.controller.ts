import { usuarios } from "../models/auth";

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
        res.status(200).json({ ok: true, user });
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
    const { nombre, password, avatar } = req.body;
    const user: any = await usuarios.findByPk(id);
    user.nombre = nombre;
    user.password = password;
    user.avatar = avatar;
    user.save();
    res.status(200).json({ ok: true, user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    await usuarios.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
