'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('CategoryCourse', {
        categoryCourseID: {
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
        categoryId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                key: "categoryId",
                model: "Category",
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
      }, { freezeTableName: true});
    },
  
    down: (queryInterface) => {
      return queryInterface.dropTable('CategoryCourse');
    }
  };
  