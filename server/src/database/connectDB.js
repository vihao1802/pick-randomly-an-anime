import sequelize from "../config/db.config.js";
import anime from "../model/anime.model.js";
import saved from "../model/saved.model.js";

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    await anime.sync({ alter: true });
    await saved.sync({ alter: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

export default connectToDB;
