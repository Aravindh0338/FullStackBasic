import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/register/Register';
import Login from "./components/login/Login";
import AddExpense from "./components/add-expense-data/AddExpense";
import ExpenseTrackerHome from "./components/get-expense-data/ExpenseTrackerHome";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";

function App() {
  return (
    <Router>
    <Routes>  
      <Route exact path="/home" element={ProtectedRoute(<ExpenseTrackerHome />) }/>
      <Route exact path='/add-expense' element={ProtectedRoute(<AddExpense/>)}/>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>
  </Router>
  );
}

export default App;
