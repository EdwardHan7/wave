const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

sequelize.authenticate()
    .then(() => console.log('Database Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error));

class Employee extends Model {}

Employee.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    job_group: DataTypes.STRING,
}, { sequelize, modelName: 'employee' });

class TimeReport extends Model {}

TimeReport.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    reportId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: DataTypes.DATEONLY,
    hours_worked: DataTypes.FLOAT,
    employeeId: {
        type: DataTypes.STRING,
        references: {
            model: Employee,
            key: 'id',
        },
    },
}, { sequelize, modelName: 'time_report' });

// Define the relationship
Employee.hasMany(TimeReport, { foreignKey: 'employeeId' });
TimeReport.belongsTo(Employee, { foreignKey: 'employeeId' });

sequelize.sync();
module.exports = { TimeReport, Employee };
