// TransactionList.js
import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Fetch transactions when the component mounts
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      // Make a GET request to the API endpoint to get all transactions
      const response = await axios.get(
        "http://localhost:3001/api/transactions"
      );
      setTransactions(response.data);
      const quantitySum = response.data.reduce(
        (sum, transaction) => sum + transaction.quantity,
        0
      );
      const amountSum = response.data.reduce(
        (sum, transaction) => sum + transaction.total,
        0
      );

      setTotalQuantity(quantitySum);
      setTotalAmount(amountSum);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    }
  };
console.log(transactions);
  return (
    <div className="transaction-list-container">
      <h2>Transaction List</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Customer Name</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Rate</th>
            <th>Date</th>
            <th>Fat</th>
            <th>Degree</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction ,index) => (
            <tr key={transaction.id}>
              <td>{index+1}</td>
              <td>{transaction.customer_name}</td>
              <td>{transaction.quantity}</td>
              <td>{Math.floor(transaction.total)}</td>
              <td>{transaction.rate}</td>
              <td>{transaction.date}</td>
              <td>{transaction.fat}</td>
              <td>{transaction.degree}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <li className="transaction-item">
        <p>
          <strong>Total Quantity:</strong> {totalQuantity} liter
        </p>
        <p>
          <strong>Total Amount:</strong> { Math.floor(totalAmount)} Rs
        </p>
      </li>
    </div>
  );
};

export default TransactionList;
