import { Sequelize, Model, DataTypes } from "sequelize";
import { db } from "../db/conexion";

export const comics = db.define(
  "comics",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
    },
    portada: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    capitulos: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
