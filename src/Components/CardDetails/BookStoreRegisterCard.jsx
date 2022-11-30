import React, { Component } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import './BookStoreRegisterCard.css';

export default class BookStoreRegisterCard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            DOB: '',
            password: ''

        }
    }

    handleFirstName = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }

    handleLastName = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }

    handleAddress = (event) => {
        this.setState({
            address: event.target.value
        })
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleDOB = (event) => {
        this.setState({
            DOB: event.target.value
        })
    }

    handlePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleSubmit = async () => {

        await axios.post("http://localhost:8080/User/insertUser", this.state)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            });
        console.log("User added")
    }

    notifySubmit = () => {
        toast('User Added!!');
    }

    render() {
        return (
            <div>
                <Card className='BookCard'>
                    <h2 >BookStore</h2><br></br>
                    <div>
                        <form>
                            <div>
                                <label className='name-field'> First Name </label>
                                <div >
                                    <TextField required className='name-box' variant="outlined" onChange={(event) => this.handleFirstName(event)} value={this.state.firstName} />
                                    <p>{this.state.firstName}</p>
                                </div>
                                </div>

                                <div>
                                <label className='name-field'> Last Name </label>
                                <div >
                                    <TextField required className='name-box' variant="outlined" onChange={(event) => this.handleLastName(event)} value={this.state.lastName} />
                                    <p>{this.state.lastName}</p>
                                </div>
                                </div>
                                <div>
                                <label className='name-field'> Email </label>
                                <div >
                                    <TextField required className='name-box' variant="outlined" onChange={(event) => this.handleEmail(event)} value={this.state.email} />
                                    <p>{this.state.email}</p>
                                </div>
                                </div>
                                <div>
                                <label className='name-field'> Address </label>
                                <div >
                                    <TextField required className='name-box' variant="outlined" onChange={(event) => this.handleAddress(event)} value={this.state.address} />
                                    <p>{this.state.address}</p>
                                </div>
                                </div>
                                <div>
                                <label className='name-field'> DOB </label>
                                <div >
                                    <TextField required className='name-box' variant="outlined" onChange={(event) => this.handleDOB(event)} value={this.state.DOB} />
                                    <p>{this.state.DOB}</p>
                                </div>
                                </div>
                                <div>
                                <label className='name-field'> Password </label>
                                <div >
                                    <TextField required className='name-box' variant="outlined" onChange={(event) => this.handlePassword(event)} value={this.state.password} />
                                    <p>{this.state.password}</p>
                                </div>
                                </div>
                                <Stack className='submit-reset-button' spacing={3} direction="row">
                                    <Button variant="outlined" onClick={this.notifyCancel}>Cancel</Button>
                                    <ToastContainer />
                                    <Button type="submit" variant="outlined" onClick={this.handleSubmit}>Submit</Button>
                                    <ToastContainer />
                                    <Button variant="outlined">Reset</Button>
                                </Stack>
                            <br />
                        </form>
                    </div>
                </Card>
            </div>
        );
    }
}