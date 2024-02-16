// LemonTransaction.js

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table,Form } from "react-bootstrap";

const LemonTransaction = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch("http://localhost:3001/api/users")
      .then((response) => response.json())
      .then((data) => {
        const dataArray = Array.isArray(data) ? data : [data];
        setUsers(dataArray);
      })
      .catch((error) => console.error("Error fetching users:", error))
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const lowerCaseName = user.name.toLowerCase();
      return (
        lowerCaseName.includes(searchTerm.toLowerCase()) ||
        user.id.toString().includes(searchTerm.toLowerCase())
      );
    });
  }, [users, searchTerm]);

  const onButtonClick = () => {
    navigate("/home");
  };

  return (
    <div>
         <h1>Lemon Adat System</h1>
      <Form.Group controlId="searchTerm">
        <Form.Label>Search Customer (by name or ID):</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter customer name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Usename Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="buttonContainer">
        <input type="button" onClick={onButtonClick} value="Home" />
      </div>
    </div>
  );
};

export default LemonTransaction;
