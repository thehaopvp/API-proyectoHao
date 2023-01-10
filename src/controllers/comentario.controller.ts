
import { comentarios } from "../models/comentarios";
import { usuarios } from "../models/auth";
import './../models/asociaciones';

const fs = require("fs");
const AdmZip = require("adm-zip");
const unzipper = require("unzipper");
const { Op } = require('sequelize')

export const getComentario = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    let comentario: any = await comentarios.findAll(
      {
        include:[{
            model: usuarios,
        }],
        where: { id_comic: id },

      },
    );
    res.status(200).json({ ok: true, comentario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};


export const createComentario = async (req: any, res: any) => {
    try {
      let { comentario, id_comic , id_usuario } = req.body;
      const nuevoComentario = await comentarios.create({
        comentario,
        id_comic,
        id_usuario
      });
      res.status(200).json({ ok: true, nuevoComentario });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };