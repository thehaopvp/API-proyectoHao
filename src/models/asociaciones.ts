import { comics } from "./comics";
import { capitulos } from "./capitulos";
import { usuarios } from "./auth";
import { comentarios } from "./comentarios";

comics.hasMany(capitulos, {
  foreignKey: "id_comic",
});

comics.hasMany(comentarios, {
  foreignKey: "id_comic",
});

usuarios.hasMany(comentarios, {
  foreignKey: "id_usuario",
});