import { Sequelize, Model, DataTypes } from "sequelize";
import { db } from "../db/conexion";

export const usuarios = db.define(
  "usuarios",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
    },
    imagen: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
