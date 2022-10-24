import {Sequelize} from "sequelize";


export const db = new Sequelize('proyectocomics', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
  });
  
 export default db;
  