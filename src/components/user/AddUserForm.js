// AddUserForm.js

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import UserList from "./UserList"; // Import your CustomerList component
import { useNavigate } from "react-router-dom";

const AddUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    fetch("http://localhost:3001/api/users")
      .then((response) => response.json())
      .then((data) => {
        const dataArray = Array.isArray(data) ? data : [data];
        setUsers(dataArray);
      })
      .catch((error) => console.error("Error fetching users:", error))
      .finally(() => setLoading(false));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/api/users", {
        name,
        email,
      });
      alert("User added successfully!");
      console.log("User added successfully:", response.data);
      getUsers();
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error adding user:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredUser = useMemo(() => {
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
    // You'll update this function later
  };
  return (
    <div>
      <div className="add-user-form">
        <h2>Add User</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit" disabled={loading}>
            {loading ? "Adding User..." : "Add User"}
          </button>
        </form>
      </div>

      {/* Render the CustomerList component and pass the filtered users */}
      <UserList User={filteredUser} />
      <div className={"buttonContainer"}>
        <input
          // className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Home"}
        />
      </div>
    </div>
  );
};

export default AddUserForm;
