const db = require("../Models/index");

exports.addExpense = async (req, res) => {
  const { id } = req.token;
  const expense = {
    reason:req.body.data.reason,
    expenserate: req.body.data.cost,
    typeofexpense: req.body.data.expensetype,
    userId: id,
  };
  const createResult = await db.userExpense.create(expense);
  console.log("Expenses",createResult)
  if (createResult) {
    return res.status(200).send({ message: "Successfully add new Expense" });
  } else {
    return res.status(500).send({ message: "User not Found" });
  }
};

exports.getExpense = async (req, res) => {
  const userId = req.token.id;
  const result = await db.userExpense.findAll({ where: { userId } });
  if (result) {
    return res.status(200).send({ message: "Successfully Get Expense",expenses:result });
  }
  return res.status(400).send({ message: "no data found" });
};
