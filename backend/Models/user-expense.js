const Sequelize = require("sequelize");


const userExpense = (sequelize)=>{ 
const Expense=sequelize.define('expense',{
    reason:{type:Sequelize.STRING},
    typeofexpense:{type:Sequelize.STRING},
    expenserate:{type:Sequelize.STRING},
});
return Expense
}

module.exports=userExpense;