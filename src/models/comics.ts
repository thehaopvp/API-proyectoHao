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
      allowNull:false
    },
    portada: {
      type: DataTypes.STRING,
      allowNull:false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull:false
    }
  },
  {
    timestamps: false,
  }
);
