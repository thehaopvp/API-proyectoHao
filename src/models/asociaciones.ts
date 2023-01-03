import { comics } from "./comics";
import { capitulos } from "./capitulos";

comics.hasMany(capitulos, {
  foreignKey: "id_comic",
});
