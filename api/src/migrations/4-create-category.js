'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('Category', {
        categoryId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        active: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        companyId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            key: "companyId",
            model: "Company",
          },
        },
      }, { freezeTableName: true});
    },
  
    down: (queryInterface) => {
      return queryInterface.dropTable('Category');
    }
  };
  