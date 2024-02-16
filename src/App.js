import Home from './components/Home';
import Login from './components/Login';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import TransactionScreen from './components/TransactionScreen';
import AddUserForm from './components/user/AddUserForm';
import TransactionList from './components/transactions/TransactionList';
import Register from './components/user/Register';
import LemonTransaction from './components/transactions/LemonTransaction';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")

  return (
    <div className="App">
      <BrowserRouter>
    {/* <Sidebar/> */}
        <Routes>
          <Route path="/" element={<Login email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transaction" element={<TransactionScreen />} />
          <Route path="/adduser" element={<AddUserForm />} />
          <Route path="/TransactionList" element={<TransactionList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lemon" element={<LemonTransaction />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


