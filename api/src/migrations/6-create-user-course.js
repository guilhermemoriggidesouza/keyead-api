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
        registrationDate: {
            allowNull: false,
            type: DataTypes.DATE,
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
      return queryInterface.dropTable('UserCourse');
    }
  };
  