import { Sequelize, Model, DataTypes } from "sequelize";
import { db } from "../db/conexion";

export const capitulos = db.define(
  "capitulos",
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
    imagenes: {
        type: DataTypes.STRING,
        allowNull:false
      },

    id_comic: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  },
  {
    timestamps: false,
  }
);
