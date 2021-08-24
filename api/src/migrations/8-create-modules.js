'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('Modules', {
        moduleId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        duration: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        courseId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                key: "courseId",
                model: "Course",
            },
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
      return queryInterface.dropTable('Modules');
    }
  };
  