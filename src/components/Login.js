import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    
    const navigate = useNavigate();
        
    const onButtonClick = async() => {

        // Set initial error values to empty
        setEmailError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }
       
        try {
            const response = await axios.post('http://localhost:3001/api/login', { email, password });
            console.log('response',response);
          //   const token = response.data.token;
            // Save the token to local storage or secure cookie
          //   localStorage.setItem('token', token);
            // Notify the parent component that the login is successful
            const user = response.data.data;

            // Save the token to local storage
            localStorage.setItem('user', JSON.stringify({ user }));
          
            navigate('/home');
          } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
          }
         
        // Authentication calls will be made here...       

    }

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>WebApp</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="Enter your email here"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Log in"} />
        </div>
        <div>new to WebApp  <Link to="/register">Register</Link> </div>
    </div>
}

export default Login