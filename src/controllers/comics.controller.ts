import { comics } from "../models/comics";
import jwt from "jsonwebtoken";

export const getComics = async (req: any, res: any) => {
  try {
    const comic = await comics.findAll();
    res.status(200).json({ ok: true, comic });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getComicId = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const comic = await comics.findOne({
      where: { id },
    });
    if (!comic) {
      res.status(404).json({ message: "No existe ese comic " });
    } else {
      res.status(200).json({ ok: true, comic });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};



export const createComic = async (req: any, res: any) => {
  try {
    const { titulo, portada,descripcion,capitulos } = req.body;

    const nuevoComic = await comics.create({
      titulo,
      portada,
      descripcion,
      capitulos
    });
    res.status(200).json({ ok: true, nuevoComic });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const changeComic = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const {  titulo, portada,descripcion,capitulos } = req.body;
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




