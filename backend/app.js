const express=require('express')
const app = express();
const cors = require("cors");
const  router  = require('./Routers/user-route');
// const { verifyToken } = require('./Middlewares/token-verify');
// const expenseController=require('./Controllers/user-expense');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);
// app.use("/add-expense",verifyToken,expenseController.addExpense)
// app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3001,()=>{
    console.log("connection created")
})