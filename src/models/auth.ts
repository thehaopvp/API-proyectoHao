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
      unique:true,
      allowNull:false
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull:false
    },
    role: {
      type: DataTypes.STRING,
      allowNull:false
    },
  },
  {
    timestamps: false,
  }
);
