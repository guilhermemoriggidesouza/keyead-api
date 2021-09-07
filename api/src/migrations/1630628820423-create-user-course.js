'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('UserCourse', {
        userCourseId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        courseId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                key: "courseId",
                model: "Course",
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
        responsable: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
      }, { freezeTableName: true});
    },
  
    down: (queryInterface) => {
      return queryInterface.dropTable('UserCourse');
    }
  };
  