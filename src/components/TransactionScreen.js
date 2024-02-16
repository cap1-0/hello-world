import React, { useState, useMemo, useEffect } from "react";
import { Form } from "react-bootstrap";
import CustomerList from "./CustomerList";
import TransactionFormModal from "./TransactionFormModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TransactionScreen() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchTransactions();
    // Fetch dummy customers from JSONPlaceholder
    fetch("http://localhost:3001/api/customer")
      .then((response) => response.json())
      .then((data) => {
        const dataArray = Array.isArray(data) ? data : [data];
        setCustomers(dataArray);
        console.log(dataArray);
      })
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTransactions = async () => {
    try {
      // Make a GET request to the API endpoint to get all transactions
      const response = await axios.get(
        "http://localhost:3001/api/transactions"
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    }
  };

  const handleAddTransaction = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const addTransaction = async (transactionData) => {
    setShowModal(false);
    const user = localStorage.getItem('user');
    const tokenObject = user ? JSON.parse(user) : null;
  
    console.log('tokenObject.user._Id',tokenObject.user.name);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/addTransactions",
        {
          // "date": "ap@example.com",
          // "admin_id": "1",
          // "customer_id": "12",
          // "degree": "3",
          // "fat": "4",
          // "quantity": "15",
          // "total": "16",
          // "rate": "17"
          customer_id:selectedCustomer.id,
          admin_name: tokenObject.user.name,
          customer_name: selectedCustomer.name,
          date: transactionData.date,
          degree: transactionData.degree,
          fat: transactionData.fat,
          quantity: transactionData.quantity,
          rate: transactionData.rate,
          total: transactionData.total,
        }
      );
      await fetchTransactions();
      console.log("Transaction saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving transaction:", error.message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
  };
  const onadduserclic = () => {
    navigate("/adduser");
    // You'll update this function later
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const lowerCaseName = customer.name.toLowerCase();
      return (
        lowerCaseName.includes(searchTerm.toLowerCase()) ||
        customer.id.toString().includes(searchTerm.toLowerCase())
      );
    });
  }, [customers, searchTerm]);

  return (
    <div>
      <div style={{ alignContent: "end" }}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onadduserclic}
          value={"add user"}
        />
      </div>
      <h1>Milk Dairy Transaction System</h1>

      <Form.Group controlId="searchTerm">
        <Form.Label>Search Customer (by name or ID):</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter customer name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <CustomerList
        customers={filteredCustomers}
        transactions={transactions}
        handleAddTransaction={handleAddTransaction}
      />

      <TransactionFormModal
        show={showModal}
        handleClose={handleCloseModal}
        addTransaction={addTransaction}
        customer={selectedCustomer}
        existingTransaction={transactions}
      />
    </div>
  );
}

export default TransactionScreen;
