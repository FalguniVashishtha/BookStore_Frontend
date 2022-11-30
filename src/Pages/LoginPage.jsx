import React, { Component } from 'react';
import BookStoreAppBar from '../Components/AppBarDetails/BookStoreAppBar';
import BookStoreLoginCard from '../Components/CardDetails/BookStoreLoginCard';

class LoginPage extends Component {
    render() {
        return (
            <div>
                <BookStoreAppBar/>
                <BookStoreLoginCard/>
            </div>
        );
    }
}

export default LoginPage;