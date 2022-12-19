import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Order(props) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Order Placed Successfully</h2>
      <button onClick={() => navigate('/BookList')}>Continue Shopping</button>
    </div>
  )
}