import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js";

const User = sequelize.define(
  "User",
  {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    email: { 
      type: DataTypes.STRING, 
      unique: true,
      allowNull: false
    },
    password: { 
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    timestamps: true,
    tableName: 'Users'
  }
);

export default User;
