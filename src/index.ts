import app from "./app";
import { db } from "./db/conexion";
import "./models/auth";

async function main() {
  try {
    await db.sync({ force: false });

    app.listen(8080);
    console.log("Se ha ejecutado correctamente sequelize");
  } catch (error) {
    console.log(error);
  }
}

main();
