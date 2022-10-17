import {Sequelize} from "sequelize";


export const db = new Sequelize('usuario', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
  });
  
 export default db;
  