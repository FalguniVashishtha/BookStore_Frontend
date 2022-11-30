import React, { Component } from 'react';
import BookStoreAppBar from '../Components/AppBarDetails/BookStoreAppBar';
import BookStoreRegisterCard from '../Components/CardDetails/BookStoreRegisterCard';


class RegisterPage extends Component {
    render() {
        return (
            <div>
                <BookStoreAppBar/>
                <BookStoreRegisterCard/>
            </div>
        );
    }
}

export default RegisterPage;
