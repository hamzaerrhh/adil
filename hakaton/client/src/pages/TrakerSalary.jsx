import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import SalaryChart from "../components/Charts/SalaryChart";
import { FaSpinner, FaSave } from "react-icons/fa";

const TrackerSalary = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [transactionName, setTransactionName] = useState("");
  const [transactionCategory, setTransactionCategory] = useState("expense");
  const [transactionAmount, setTransactionAmount] = useState(0);

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const token = Cookies.get("token");
        const res = await axios.post("http://localhost:5000/data/salary", {
          token,
        });
        setTransactions(res.data);
      } catch (error) {
        console.error("Error fetching salary:", error);
      }
    };
    fetchSalary();
  }, []);

  const handleAddTransaction = () => {
    const newTransaction = {
      id: Date.now(),
      category: transactionCategory,
      name: transactionName,
      amount: transactionAmount,
      day: new Date().getDate(),
    };
    setTransactions([newTransaction, ...transactions]);
    // Clear transaction fields
    setTransactionName("");
    setTransactionCategory("expense");
    setTransactionAmount(0);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const handleToggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleTransactionNameChange = (e) => {
    setTransactionName(e.target.value);
  };

  const handleTransactionCategoryChange = (e) => {
    setTransactionCategory(e.target.value);
  };

  const handleTransactionAmountChange = (e) => {
    setTransactionAmount(parseFloat(e.target.value) || 0);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      await axios.post("http://localhost:5000/data/update-salary", {
        token,
        newSalary: transactions,
      });
      setLoading(false);
    } catch (err) {
      console.log("Error saving:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Salary Tracker</h2>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Add Transaction</h3>
        <div className="flex flex-col md:flex-row items-center mb-2">
          <input
            type="text"
            value={transactionName}
            onChange={handleTransactionNameChange}
            className="border border-gray-300 rounded-md py-2 px-4 mb-2 md:mr-2 md:mb-0"
            placeholder="Enter name"
          />
          <select
            value={transactionCategory}
            onChange={handleTransactionCategoryChange}
            className="border border-gray-300 rounded-md py-2 px-4 mb-2 md:mr-2 md:mb-0"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="investment">Investment</option>
          </select>
          <input
            type="number"
            value={transactionAmount}
            onChange={handleTransactionAmountChange}
            className="border border-gray-300 rounded-md py-2 px-4 mb-2 md:mr-2 md:mb-0"
            placeholder="Enter amount"
          />
          <button
            onClick={handleAddTransaction}
            className="bg-blue-500 text-white rounded-md py-2 px-4 md:mb-0"
          >
            Add
          </button>
        </div>
      </div>
      <button
        onClick={handleToggleHistory}
        className="bg-gray-200 text-gray-700 rounded-md py-2 px-4 mb-4"
      >
        {showHistory ? "Hide History" : "Browse History"}
      </button>
      {showHistory && (
        <div className="grid grid-cols-1 gap-4 mb-4">
          {transactions.slice(0, 3).map((transaction) => (
            <div
              key={transaction.id}
              className={`p-2 border rounded-md ${
                transaction.category === "expense"
                  ? "border-red-500"
                  : transaction.category === "income"
                  ? "border-green-500"
                  : "border-orange-500"
              }`}
            >
              <p className="font-bold">{transaction.name}</p>
              <p>Category: {transaction.category}</p>
              <p>Amount: ${transaction.amount}</p>
              <p>Day: {transaction.day}</p>
              <button
                onClick={() => handleDeleteTransaction(transaction.id)}
                className="text-xs text-red-500 mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <SalaryChart transactions={transactions} />
      <button
        className={`bg-green-600 text-white   py-4 px-4 rounded-full ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
        }`}
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
      </button>
      <div className="mt-4 text-center">
        {/* Display expenses, income, and investments */}
      </div>
    </div>
  );
};

export default TrackerSalary;
