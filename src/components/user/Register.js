import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const navigate = useNavigate();

  const onButtonClick = async() => {
    // Set initial error values to empty
    setEmailError("");
    setPasswordError("");
    setNameError("");
    setMobileError("");

    // Check if the user has entered both fields correctly
    if (name.length < 3) {
      setNameError("The name must be 3 characters or longer");
      return;
    }
    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }
    if (mobile.length < 10) {
      setMobileError("Enter correcrt mobile number");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    try {
    //   const response = await axios.post("http://localhost:3001/register", {
    //     email,
    //     password,
    //     mobile,
    //     name,
    //   });
      const response = await axios.post('http://localhost:3001/api/register', {
        email,
        password,
        mobile,
        name,
      });
      alert('User added successfully!');
      console.log("response", response);
    //   const token = response.data.token;
    //   // Save the token to local storage or secure cookie
    //   localStorage.setItem("token", token);
      // Notify the parent component that the login is successful
      navigate("/login");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Create Account</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={name}
          placeholder="Enter your name here"
          onChange={(ev) => setName(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{nameError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          type="number"
          value={mobile}
          placeholder="Enter your mobile number here"
          onChange={(ev) => setMobile(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{mobileError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Register"}
        />
      </div>
      <div>
        already register <Link to="/login">LogIn</Link>{" "}
      </div>
    </div>
  );
};

export default Register;
