const bcrypt = require("bcrypt");
const db = require("../Models/index");
const jwt = require("jsonwebtoken");

exports.createNewUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;
  const location = req.body.location;
  bcrypt.hash(req.body.password, 10).then((password) => {
    db.user.findOne({ where: { email } }).then((result) => {
      if (result) {
        return res
          .status(409)
          .send({ message: "Email id is already exist", statusCode: 409 });
      }
    db.user.create({ name, email, password, age, location })
        .then((result) => {
          console.log("Register Response", result);
          return res.status(200).send({
            message: "New user Registered successfully",
            statusCode: 200,
          });
        })
        .catch((err) => {
          console.log("Error", err);
        });
    });
  });
};

exports.userLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.user.findOne({ where: { email } }).then(async (result) => {
    const id=result.id;
   const validation= await bcrypt.compare( password,result.password)
      if (validation) { 
        const token=await jwt.sign({ id,email,password }, "Aravindh12345");
        return res
          .status(200)
          .send({ message: "User is logged in", statusCode: 200,token:token,name:result.name });
      }
    return res
      .status(401)
      .send({ message: "Invalid user name", statusCode: 401 });
  });
};
