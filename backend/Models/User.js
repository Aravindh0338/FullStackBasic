const Sequelize = require("sequelize");


const userModel =(sequelize)=>{
const User=sequelize.define('users',{
    name:{type:Sequelize.STRING},
    email:{type:Sequelize.STRING},
    password:{type:Sequelize.STRING},
    age:{type:Sequelize.INTEGER},
    location:{type:Sequelize.STRING}
});
return User
}

module.exports=userModel;