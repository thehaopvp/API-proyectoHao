import { capitulos } from "../models/capitulos";
const fs = require("fs");
const AdmZip = require("adm-zip");
const unzipper = require("unzipper");

export const getCapitulos = async (req: any, res: any) => {
  try {
    let capitulo: any = await capitulos.findAll();
    res.status(200).json({ ok: true, capitulo });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getCapituloId = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const capitulo: any = await capitulos.findOne({
      where: { id },
    });
    if (!capitulo) {
      res.status(404).json({ message: "No existe ese capitulo " });
    } else {
      res.status(200).json({ ok: true, capitulo });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createCapitulos = async (req: any, res: any) => {
  try {
    let { titulo, imagenes, id_comic } = req.body;
    let data = imagenes.slice(40);
    let buf = new Buffer(data, "base64");
    let nombreImagen = titulo + ".zip";
    fs.writeFile(
      "./../src/imagenes/capitulos/" + nombreImagen,
      buf,
      function (err: any, result: any) {
        if (err) {
          console.log("error", err);
        }
      }
    );

    fs.createReadStream("./../src/imagenes/capitulos/" + nombreImagen)
      .pipe(unzipper.Extract({ path: "./../src/imagenes/capitulos"}))
      .on("close", () => {
        console.log("Files unzipped successfully");
      });

    imagenes = nombreImagen;
    const nuevoCapitulo = await capitulos.create({
      titulo,
      imagenes,
      id_comic,
    });
    res.status(200).json({ ok: true, nuevoCapitulo });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const changeCapitulos = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { titulo } = req.body;
    const capitulo: any = await capitulos.findByPk(id);
    capitulo.titulo = titulo;
    capitulo.save();
    res.status(200).json({ ok: true, capitulo });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteCapitulos = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const capitulo = await capitulos.findOne({
      where: { id },
    });

    if (!capitulo) {
      res.status(404).json({ message: "No existe ese capitulo " });
    } else {
      await capitulos.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ message: " Capitulo eliminado correctamente" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
