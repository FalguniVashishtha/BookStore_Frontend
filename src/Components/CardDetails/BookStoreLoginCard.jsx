import React, { Component } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stack from '@mui/material/Stack';
import { loginUser } from '../Services/BookStoreService';
import './BookStoreLoginCard.css';

class BookStoreLoginCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''

        }
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handlePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleSubmit = async () => {
        let data = {
            email: this.state.email,
            password: this.state.password,
        };
        console.log("pass1");
        await loginUser(data)
            .then((res) => {
                let message = "";
                if (res.data.statusCode === 200)
                    message = "Sign in successful"
                console.log("response" + res.data);
                // localStorage.setItem('token',res.data.message);
                // console.log("token----",+localStorage.getItem('token'));
                this.setState({
                    SnackbarOpen: true,
                    SnackbarMessage: message
                })

            })
        // await axios.get("http://localhost:8080/login", this.state)
        //     .then((response) => {
        //         console.log(response.data)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     });
        // console.log("Login successfully")
    }


    notifySubmit = () => {
        toast('Login Done!!');
    }

    render() {
        return (
            <div>
                <Card className='BookCard'>
                    <h2 >BookStore</h2><br></br>
                    <form>
                        <div>
                            <label className='name-field'> User Name </label>
                            <div >
                                <TextField required className='name-box' variant="outlined" onChange={(event) => this.handleEmail(event)} value={this.state.email} />
                                <p>{this.state.email}</p>
                            </div>


                            <label className='name-field'> Password </label>
                            <div >
                                <TextField required className='name-box' variant="outlined" onChange={(event) => this.handlePassword(event)} value={this.state.password} />
                                <p>{this.state.password}</p>
                            </div>

                            <Stack className='submit-reset-button' spacing={3} direction="row">
                                <Button variant="outlined" onClick={this.notifyCancel}>Cancel</Button>
                                <ToastContainer />
                                <Button type="submit" variant="outlined" onClick={this.handleSubmit}>Submit</Button>
                                <ToastContainer />
                                <Button variant="outlined">Reset</Button>
                            </Stack>
                        </div>
                        <br />

                    </form>
                </Card>
            </div>
        );
    }
}
export default BookStoreLoginCard;
