import axios from 'axios';
import React, { useState } from 'react';
import './BookStoreLoginCard.css'
import { Card } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function BookStoreLoginCard() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const loginBuyer = { email: email, password: password }
    await axios.post('http://localhost:8080/User/login', loginBuyer)
      .then((response) => {
        console.log(response.data.obj)
        if (response.data) {
          localStorage.setItem("token", response.data.obj)
          localStorage.setItem("token", response.data.obj)
        }
        navigate('/BookList');
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <Card className='login-card' style={{ backgroundColor: 'gainsboro' }}>
        <div>
          <h1>Login to Book Store</h1>
          <label className='login-lable'>Email </label>
          <input className='login-input' type={'email'} placeholder="Enter your email"
            value={email} onChange={(e) => { setEmail(e.target.value) }} style={{ marginLeft: '34px' }} />
        </div>
        <div>
          <lable className='login-lable'>Password </lable>
          <input className='login-input' type={'password'} placeholder="Enter your password"
            value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <br />
        <button onClick={handleLogin} style={{ marginLeft: '34px' }}>Login</button>
        <Link to={'/registerpage'} style={{ marginLeft: '10px' }}>  Don't have an account</Link>
      </Card>
    </div>
  )
}