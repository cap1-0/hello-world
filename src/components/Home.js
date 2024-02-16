import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Home = (props) => {
  // const { loggedIn, email } = props;
  const navigate = useNavigate();

  console.log("props", props);
  const onButtonClick = () => {
    navigate("/transaction");
    // You'll update this function later
  };
  const onlemonclic = () => {
    navigate("/lemon");
    // You'll update this function later
  };
  const onTransactionListclic = () => {
    navigate("/TransactionList");
    // You'll update this function later
  };
  const user = localStorage.getItem('user');
  const tokenObject = user ? JSON.parse(user) : null;

  console.log(tokenObject.user.name);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <h2>Hello {tokenObject.user.name}</h2>
      <div className={"buttonContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Open dairy software"}
        />
      </div>
      <div className={"buttonContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onlemonclic}
          value={"Lemon Adat"}
        />
      </div>
      <div className={"buttonContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onTransactionListclic}
          value={"transaction list"}
        />
      </div>
    </div>
  );
};

export default Home;
