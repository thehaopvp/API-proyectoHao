import { comics } from "../models/comics";
import jwt from "jsonwebtoken";
const fs = require("fs");
let path = require('path');

export const getComics = async (req: any, res: any) => {
  try {
    let comic: any = await comics.findAll();
    res.status(200).json({ ok: true, comic });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getComicsImg = async (req: any, res: any) => {
  try {
    let { id } = req.params;
    res.sendFile(path.resolve(`./../src/imagenes/comics/` + id));
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getComicId = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const comic:any = await comics.findOne({
      where: { id },
    });
    if (!comic) {
      res.status(404).json({ message: "No existe ese comic " });
    } else {
      comic.portada = fs.readFileSync(
        "./../src/imagenes/comics/" + comic.portada,
        "base64"
      );
      res.status(200).json({ ok: true, comic });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createComic = async (req: any, res: any) => {
  try {
    let { titulo, portada, descripcion, capitulos } = req.body;
    let data = portada.replace(/^data:image\/\w+;base64,/, "");
    let buf = new Buffer(data, "base64");
    let nombreImagen = new Date().getTime() + ".png";
    fs.writeFile(
      "./../src/imagenes/comics/" + nombreImagen,
      buf,
      function (err: any, result: any) {
        if (err) {
          console.log("error", err);
        }
      }
    );
    portada = nombreImagen;
    const nuevoComic = await comics.create({
      titulo,
      portada,
      descripcion,
      capitulos,
    });
    res.status(200).json({ ok: true, nuevoComic });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const changeComic = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { titulo, portada, descripcion, capitulos } = req.body;
    const comic: any = await comics.findByPk(id);
    comic.titulo = titulo;
    comic.portada = portada;
    comic.descripcion = descripcion;
    comic.capitulos = capitulos;
    comic.save();
    res.status(200).json({ ok: true, comic });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteComic = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const comic = await comics.findOne({
      where: { id },
    });

    if (!comic) {
      res.status(404).json({ message: "No existe ese comic " });
    } else {
      await comics.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ message: "comic eliminado correctamente" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*export const logout = async (req: any, res: any) => {
  try {
    req.session.destroy();
    res.status(200).json({ ok: true});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
*/
