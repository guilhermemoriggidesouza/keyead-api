'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('UserClass', {
        userClassId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        classId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                key: "classId",
                model: "Class",
            },
        },
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                key: "userId",
                model: "User",
            },
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
        isFinished: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
      }, { freezeTableName: true});
    },
  
    down: (queryInterface) => {
      return queryInterface.dropTable('UserClass');
    }
  };
  