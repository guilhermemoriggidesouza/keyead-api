
module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
        companyId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        email: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        logo: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        alias: {
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
    }, { freezeTableName: true});
    
    Company.associate = (models)=>{
        Company.hasMany(models.User, { foreignKey: 'companyId' })
        Company.hasMany(models.Course, { foreignKey: 'companyId' })
        Company.hasMany(models.Category, { foreignKey: 'companyId' })
    }

    return Company;
}