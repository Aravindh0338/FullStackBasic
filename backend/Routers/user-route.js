const express=require('express');
const router = express.Router();
const userController = require('../Controllers/user')
const expenseController=require('../Controllers/user-expense');
const verifyTokenMiddleware=require('../Middlewares/token-verify')

router.route('/register-user').post(userController.createNewUser);
router.route('/login').post(userController.userLogin);
router.route('/add-expense').post(verifyTokenMiddleware.verifyToken,expenseController.addExpense)
router.route('/get-expense').get(verifyTokenMiddleware.verifyToken,expenseController.getExpense)


module.exports = router;