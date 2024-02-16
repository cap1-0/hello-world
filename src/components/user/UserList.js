// UserList.js

import React from "react";
import { Table } from "react-bootstrap";

const UserList = ({ User }) => {
  return (
    <div>
      <h2>User List</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Usename Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {User.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
