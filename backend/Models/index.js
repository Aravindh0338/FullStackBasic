const sequelize = require('../Utils/database')
const user =require('./User')(sequelize)
const userExpense = require('./user-expense')(sequelize)

const db ={}


user.hasMany(userExpense)

db.user = user
db.userExpense=userExpense

module.exports = db;
