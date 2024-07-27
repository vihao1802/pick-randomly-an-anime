import sequelize from "../config/db.config.js";
import { DataTypes } from "sequelize";
import anime from "./anime.model.js";

const saved = sequelize.define("Saved", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  animeId: {
    type: DataTypes.INTEGER,
    references: {
      model: anime,
      key: "id",
    },
  },
});

anime.hasMany(saved, { foreignKey: "animeId" });
saved.belongsTo(anime, { foreignKey: "animeId" });

export default saved;
