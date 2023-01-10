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


comentarios.belongsTo(usuarios, {
  foreignKey: {
    name: 'id_usuario'
  }
});