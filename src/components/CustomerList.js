import React from 'react';
import { Button, Table } from 'react-bootstrap';
import TransactionFormModal from './TransactionFormModal';

function CustomerList({ customers, transactions, handleAddTransaction, handleEditTransaction }) {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);


  const handleCloseModal = () => {
    setSelectedCustomer(null);
    setShowModal(false);
  };

  const getTransactionForCustomer = (customerId) => {
    return transactions.find((t) => t.customerId === customerId);
  };

  return (
    <div>
      <h2>Customer List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Transaction Quantity</th>
            <th>Transaction Total</th>
            <th>Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.id}>
              <td>{index+1}</td>
              <td>{customer.name}</td>
              <td>{getTransactionQuantity(customer.id)}</td>
              <td>{getTransactionTotal(customer.id).toFixed(2)}</td>
              <td>{getRate(customer.id).toFixed(2)}</td>
              <td>
                {getTransactionForCustomer(customer.id) ? (
                  <Button variant="info" onClick={() => handleAddTransaction(customer)}>
                    Edit Transaction
                  </Button>
                ) : (
                  <Button variant="primary" onClick={() => handleAddTransaction(customer)}>
                    Add Transaction
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <TransactionFormModal
        show={showModal}
        handleClose={handleCloseModal}
        customer={selectedCustomer}
        editTransaction={handleEditTransaction}
      />
    </div>
  );

  function getTransactionQuantity(customerId) {
    const customerTransactions = transactions.filter((t) => t.customerId === customerId);
    return customerTransactions.reduce((total, transaction) => total + transaction.quantity, 0);
  }

  function getTransactionTotal(customerId) {
    const customerTransactions = transactions.filter((t) => t.customerId === customerId);
    return customerTransactions.reduce((total, transaction) => total + transaction.total, 0);
  }

  function getRate(customerId) {
    const customerTransactions = transactions.filter((t) => t.customerId === customerId);
    const totalQuantity = customerTransactions.reduce((total, transaction) => total + transaction.quantity, 0);
    const totalAmount = customerTransactions.reduce((total, transaction) => total + transaction.total, 0);

    return totalAmount / totalQuantity || 0;
  }
}

export default CustomerList;
