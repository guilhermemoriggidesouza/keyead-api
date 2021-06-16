
module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
        companyId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        logo: DataTypes.STRING,
    }, { freezeTableName: true});
    
    Company.associate = (models)=>{
        Company.hasMany(models.User, { foreignKey: 'companyId' })
    }

    // Company.sync({force: true});

    return Company;
}