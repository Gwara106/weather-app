import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js";
import User from "../user/User.js";

const Event = sequelize.define(
  "Event",
  {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true,
    tableName: 'Events'
  }
);

// Define association
Event.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Event, { foreignKey: 'userId' });

export default Event;
