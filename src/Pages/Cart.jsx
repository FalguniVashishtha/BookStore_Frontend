import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Cart() {
    const { id } = useParams();
    const [books, setBooks] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        } else {
            getUserDetails();
            loadBookDetails();
        }
    }, []);

    const loadBookDetails = async () => { 
        let bookIds = localStorage.getItem("bookIds") ? JSON.parse(localStorage.getItem("bookIds")) : [];
        let bookData = [];
        bookIds?.map(async (id) => {
          await axios.get('http://localhost:8080/Book/get/' + id, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then((response) => {
            bookData.push(response.data.obj);
            setBooks(bookData);
          })
          .catch((error) => {
            console.log(error)
          })
        });        
    }

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value)
        if (quantity > 0) {
            console.log(quantity)
        } else {
            // loadSelectedBook();
        }
    }


    // const cart = { bookId: id, bookName: book.bookName, quantity, totalPrice };

    const handleCheckOut = async () => {
        let cart = { quantity: 10, bookId: 1, userId: 5}
        await axios.post("http://localhost:8080/Cart/createCart", cart)
        .then((response) => {
            console.log("CART CREATED ===>>",response)
        })
        .catch((error) => {
            console.log(error)
        })
        // const data = { bookInfo: book, quantity: quantity, totalPrice: totalPrice }
        // props.passingBookData(data.obj);
        navigate('/Order');

    }

    const getUserDetails = async () => {
        await axios.get('http://localhost:8080/User/getUserByToken', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then((response) => {
            setUser(response.data.obj)
          })
          .catch((error) => {
            console.log(error)
          })
    }

    const handleGoBack = () => {
        navigate('/BookList')
    }

    return (
        <div style={{display: 'flex', overflow: 'auto', flexDirection: 'column', justifyContent:'start'}}>                
            <Card style={{
                display: 'flex', justifyContent:'start', flexDirection: 'column', height: 'auto', margin: '10px 30px',
                padding: '0px 50px', alignItems: 'start', border: '#e5e5e5 1px solid'
            }}>
                <h2>My Cart</h2>
                <div className='cart-content'>
                    { books.map((book) => (
                    <div className='item-info' style={{marginBottom: '50px'}}>
                        <div style={{display: 'flex', alignItems: 'start', flexDirection: 'column'}}>
                            <div style={{ lineHeight: '1.5em'}}> Book Name : <span style={{fontSize: '20px'}}>{book.bookName}</span></div>
                            <div style={{ lineHeight: '1.5em'}}> Author : <span style={{fontSize: '14px'}}>{book.authorName}</span></div>
                            <div style={{ lineHeight: '1.5em'}}> Price : <span style={{fontSize: '16px'}}>{book.price}</span></div>
                        </div>
                        <div style={{display: 'flex', marginTop: '20px'}}>
                            <RemoveIcon></RemoveIcon>
                            <div style={{display: 'flex', lineHeight: '1.5em' }}>
                                <input type={Number} placeholder="Quantity"
                                    style={{ width: '49px', textAlign: 'center' }}
                                    onChange={(e) => { handleQuantityChange(e) }} value={quantity}>
                                </input>
                            </div>
                            <AddIcon />
                        </div>
                        <hr style={{width: '100%'}} />
                    </div>))}
                    
                </div>
            </Card>
            <Card style={{
                display: 'flex', justifyContent:'start', flexDirection: 'column', height: 'auto', margin: '10px 30px',
                padding: '0px 50px', alignItems: 'start', border: '#e5e5e5 1px solid'
            }}>
                <h2>Customer Details</h2>
                <div><input style={{margin: '10px'}} placeholder='First Name' value={user?.firstName}/> <input style={{margin: '10px'}} placeholder='Last Name' value={user?.lastName}/></div>
                <input style={{margin: '10px'}} placeholder='Email' value={user?.email}/>
                <input style={{margin: '10px'}} placeholder='Address' value={user?.address}/>
                <input style={{margin: '10px'}} placeholder='Pincode' value={user?.pincode}/>

                <div style={{ margin: '20px 10px' }}>
                    <Button variant="contained" onClick={() => { handleGoBack() }}
                        style={{ backgroundColor: '#757575' }}>
                        Go Back
                    </Button>
                    <Button variant="contained" onClick={handleCheckOut}
                        style={{ marginLeft: '150px' }}>
                        Checkout
                    </Button>
                    
                </div>
            </Card>

        </div>
    )
}