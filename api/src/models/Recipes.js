const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  //defino el modelo
  sequelize.define('recipes', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 //me genera automaticamente un UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    score: {
      type: DataTypes.FLOAT,
    },
    healthScore: {
      type: DataTypes.FLOAT
    },
    image: {
      type: DataTypes.STRING
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
  );
};