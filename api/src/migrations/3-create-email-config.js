'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('EmailConfig', {
        emailConfigId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        password: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        service: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        port: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        secure: {
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
      return queryInterface.dropTable('EmailConfig');
    }
  };
  